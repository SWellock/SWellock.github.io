import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "posts"

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

def extract_meta(html_path: Path):
    text = html_path.read_text(encoding="utf-8", errors="ignore")

    title_match = re.search(r"<title>(.*?)</title>", text, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else html_path.stem

    date_match = re.search(r'<meta\s+name=["\']date["\']\s+content=(["\'])(.*?)\1', text, re.IGNORECASE)
    date = date_match.group(2).strip() if date_match else None

    excerpt_match = re.search(r'<meta\s+name=["\']excerpt["\']\s+content=(["\'])(.*?)\1', text, re.IGNORECASE)
    excerpt = excerpt_match.group(2).strip() if excerpt_match else ""

    return title, date, excerpt


def main():
    posts = []
    skipped = []

    if not POSTS_DIR.exists():
        print(f"No posts/ folder found at {POSTS_DIR}")
        return
    for html_path in sorted(POSTS_DIR.glob("*.html")):
        title, date, excerpt = extract_meta(html_path)

        if not date or not DATE_RE.match(date):
            skipped.append(html_path.name)
            continue
        posts.append({
            "title": title,
            "date": date,
            "excerpt": excerpt,
            "path": f"posts/{html_path.name}",
        })

        posts.sort(key=lambda p: p["date"], reverse=True)

        manifest_path = ROOT / "manifest.json"
        manifest_path.write_text(json.dumps(posts, indent=2), encoding="utf-8")
        print(f"Wrote {len(posts)} posts to {manifest_path}")

        if skipped:
            print("Skipped files with missing or malformed dates:")
            for name in skipped:
                print(f" - {name}")

if __name__ == "__main__":
    main()
