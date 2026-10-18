<?php
/**
 * Plugin Name: Headless redirect to www.prachatham.com
 * Description: cms.prachatham.com is the editor/API host only. Every public
 *   page is 301-redirected to its equivalent on the Next.js frontend so Google
 *   transfers the ranking to www. Admin, login, REST, GraphQL, cron and
 *   uploads are untouched. Installed 2026-10-18 (replaces home-only redirect).
 */

const PRACHATHAM_FRONTEND = 'https://www.prachatham.com';

/** Pages on cms → paths on www (slug => path). Anything else → home. */
const PRACHATHAM_PAGE_MAP = [
    'home'        => '/',
    'about-us'    => '/about',
    'about'       => '/about',
    'contact'     => '/contact',
    'donate'      => '/donate',
    'causes'      => '/causes',
    'publication' => '/publications',
    'publications'=> '/publications',
];

function prachatham_is_machine_request(): bool {
    if ( is_admin() ) return true;
    if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) return true;
    if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) return true;
    if ( defined( 'DOING_CRON' ) && DOING_CRON ) return true;
    if ( defined( 'XMLRPC_REQUEST' ) && XMLRPC_REQUEST ) return true;
    if ( defined( 'GRAPHQL_HTTP_REQUEST' ) && GRAPHQL_HTTP_REQUEST ) return true;
    if ( isset( $_GET['rest_route'] ) ) return true;
    $path = parse_url( $_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH ) ?: '/';
    foreach ( [ '/wp-json', '/graphql', '/wp-admin', '/wp-login.php', '/wp-cron.php', '/xmlrpc.php', '/wp-content/', '/wp-includes/' ] as $p ) {
        if ( strpos( $path, $p ) === 0 ) return true;
    }
    // Editors previewing a draft from the block editor
    if ( is_preview() || isset( $_GET['preview'] ) ) return true;
    // robots.txt must be served (crawl allowed → Google sees the 301s)
    if ( function_exists( 'is_robots' ) && is_robots() ) return true;
    return false;
}

function prachatham_frontend_target(): string {
    $base = PRACHATHAM_FRONTEND;
    if ( is_front_page() ) {
        return $base . '/';
    }
    if ( is_singular( 'post' ) ) {
        return $base . '/posts/' . get_post_field( 'post_name', get_queried_object_id() );
    }
    if ( is_singular( 'projects' ) || is_singular( 'project' ) ) {
        return $base . '/projects/' . get_post_field( 'post_name', get_queried_object_id() );
    }
    if ( is_page() ) {
        $slug = get_post_field( 'post_name', get_queried_object_id() );
        return $base . ( PRACHATHAM_PAGE_MAP[ $slug ] ?? '/' );
    }
    if ( is_category() ) {
        return $base . '/category/' . get_queried_object()->slug;
    }
    if ( is_tag() ) {
        return $base . '/search?q=' . rawurlencode( get_queried_object()->name );
    }
    if ( is_search() ) {
        return $base . '/search?q=' . rawurlencode( get_search_query( false ) );
    }
    if ( is_feed() ) {
        return $base . '/feed.xml';
    }
    if ( is_home() || is_archive() ) { // blog index, date/author archives
        return $base . '/posts';
    }
    return $base . '/';
}

add_action( 'template_redirect', function () {
    if ( prachatham_is_machine_request() ) return;
    $target = prachatham_frontend_target();
    header( 'X-Redirect-By: prachatham-headless' );
    header( 'Cache-Control: public, max-age=86400' );
    wp_redirect( $target, 301 );
    exit;
}, 0 ); // priority 0: before themes/plugins print anything

// Core XML sitemaps advertised cms.* to Google — off. (www has its own.)
add_filter( 'wp_sitemaps_enabled', '__return_false' );

// robots.txt: no Sitemap line for cms (core adds it only when sitemaps are on),
// keep crawling allowed so Google can SEE the 301s and move the ranking.
add_filter( 'robots_txt', function ( $output ) {
    return "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n";
}, 99 );
