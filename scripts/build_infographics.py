import pandas as pd
import json
import os
import itertools
from collections import defaultdict, Counter

f = "/Users/visarutsankham/Downloads/[viz]CIB-with-new-logic - 19-Apr-2026 (1).csv"
cols = [
    "cib_cluster_id", "user_username_raw", "content", "Bertopic Theme Th",
    "date_posted", "cib_cluster_size", "page_name", "url",
]
df = pd.read_csv(f, usecols=cols, dtype=str, low_memory=False).fillna("")


def short(s, n=180):
    s = " ".join(str(s).split())
    return s[:n] + ("\u2026" if len(s) > n else "")


# ---------- 1) CONTENT TOPICS ----------
theme_col = "Bertopic Theme Th"
total = len(df)
themes = []
for theme, g in df.groupby(theme_col):
    if not theme:
        theme = "\u0e2d\u0e37\u0e48\u0e19\u0e46 / \u0e44\u0e21\u0e48\u0e23\u0e30\u0e1a\u0e38"
    accounts = g["page_name"].replace("", pd.NA).dropna()
    top_accts = accounts.value_counts().head(5)
    samples = []
    for _, r in g.head(4).iterrows():
        samples.append({
            "content": short(r["content"]),
            "page": r["page_name"],
            "url": r["url"],
            "date": r["date_posted"][:10],
        })
    themes.append({
        "theme": theme,
        "count": int(len(g)),
        "accounts": int(accounts.nunique()),
        "topAccounts": [{"name": k, "count": int(v)} for k, v in top_accts.items()],
        "samples": samples,
    })
themes.sort(key=lambda x: -x["count"])
topics = {"total": int(total), "themes": themes}
os.makedirs("public/infographics/content-topics", exist_ok=True)
with open("public/infographics/content-topics/data.json", "w") as fh:
    json.dump(topics, fh, ensure_ascii=False)
print("topics.json themes:", len(themes),
      "size:", os.path.getsize("public/infographics/content-topics/data.json"))

# ---------- 2) CIB NETWORK ----------
cib = df[df["cib_cluster_id"] != ""].copy()
node_posts = Counter()
node_clusters = defaultdict(set)
node_page = {}
for _, r in cib.iterrows():
    u = r["user_username_raw"] or r["page_name"]
    node_posts[u] += 1
    node_clusters[u].add(r["cib_cluster_id"])
    if u not in node_page:
        node_page[u] = r["page_name"] or u

edge_w = Counter()
for cid, g in cib.groupby("cib_cluster_id"):
    accts = sorted(set((r["user_username_raw"] or r["page_name"]) for _, r in g.iterrows()))
    for a, b in itertools.combinations(accts, 2):
        edge_w[(a, b)] += 1

nodes = [{
    "id": u,
    "name": node_page.get(u, u),
    "posts": int(node_posts[u]),
    "clusters": int(len(node_clusters[u])),
} for u in node_posts]
links = [{"source": a, "target": b, "weight": int(w)} for (a, b), w in edge_w.items()]
links.sort(key=lambda x: -x["weight"])
network = {
    "meta": {
        "posts": int(len(cib)),
        "clusters": int(cib["cib_cluster_id"].nunique()),
        "accounts": int(len(nodes)),
    },
    "nodes": nodes,
    "links": links,
}
os.makedirs("public/infographics/cib-network", exist_ok=True)
with open("public/infographics/cib-network/data.json", "w") as fh:
    json.dump(network, fh, ensure_ascii=False)
print("network.json nodes:", len(nodes), "links:", len(links),
      "size:", os.path.getsize("public/infographics/cib-network/data.json"))
print("max edge weight:", links[0]["weight"] if links else 0)
