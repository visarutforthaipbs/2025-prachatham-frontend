# Thai Text-to-Speech Reader

A free, client-side Thai text-to-speech reader using the Web Speech API with resume-from-last-position functionality.

## Features

- **Free**: No server costs or API keys required - uses browser's Web Speech API
- **Resume Position**: Saves reading progress per post, allowing users to resume where they left off
- **Thai Voice Support**: Automatically detects and uses Thai voices when available
- **Speed Control**: Adjustable reading speed (0.85x, 1.0x, 1.15x, 1.3x)
- **Voice Selection**: Choose from available Thai voices or fallback to other voices
- **Progressive Enhancement**: Works even without Thai voices, with helpful warnings
- **Accessible**: Proper ARIA labels and keyboard navigation support

## Components

### `ReaderThaiFree.tsx`

Main text-to-speech component with full controls.

**Props:**

- `postKey: string` - Unique identifier per post (slug or ID)
- `articleSelector?: string` - CSS selector for article content (default: `'article, .prose, .wordpress-content'`)
- `label?: string` - Button label (default: `'🔊 ฟังบทความ'`)

### `ReaderFloatButton.tsx`

Optional floating button that indicates resume capability.

**Props:**

- `postKey: string` - Same unique identifier as the main component

## Implementation

The components are already integrated into the post page at `/app/posts/[slug]/page.tsx`:

1. **Main Reader**: Positioned after meta information, before article content
2. **Floating Button**: Fixed position at bottom-right corner

## How It Works

1. **Text Processing**: Extracts plain text from article HTML and splits into ~180 character chunks
2. **Voice Detection**: Automatically selects Thai voice if available, warns if not found
3. **Progress Saving**: Stores current chunk index in localStorage with key pattern `tts:<postKey>:idx`
4. **Queue Management**: Creates SpeechSynthesisUtterance queue for smooth playback

## Controls

- **🔊 ฟังบทความ**: Play from beginning
- **▶️ เล่นต่อ**: Resume from saved position (enabled when position exists)
- **⏸️ Pause**: Pause current playback
- **▶️ Resume**: Resume paused playbook
- **⏹️ Stop**: Stop and clear queue
- **Speed**: Adjust playback speed
- **Voice**: Select from available voices (Thai voices listed first)

## Browser Support

- **Chrome/Edge**: Full support with high-quality voices
- **Android Chrome**: Usually includes Thai TTS
- **Safari (macOS/iOS)**: Works, but voices load after user interaction

## Thai Voice Installation

If no Thai voice is detected, users can add Thai TTS:

**iOS/macOS:**

1. Settings → Accessibility → VoiceOver → Speech → Voices
2. Download Thai voice pack

**Android:**

1. Settings → Language & Input → Text-to-Speech
2. Install Google TTS and Thai language pack

**Windows:**

1. Settings → Time & Language → Speech
2. Add Thai voice from language packs

## Storage

- **localStorage Key**: `tts:<postKey>:idx`
- **Value**: Current chunk index (number)
- **Cleanup**: Automatically removed when reading completes

## Future Enhancements

- Cloud TTS fallback with MP3 caching
- Highlight current sentence while reading
- Bookmark multiple positions per article
- Reading statistics and user preferences
