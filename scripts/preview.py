#!/usr/bin/env python3
"""Loopback-only static preview with the same custom 404 page as GitHub Pages."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse
ROOT = Path(__file__).resolve().parent.parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        page = ROOT / ('en/404.html' if urlsplit(self.path).path.startswith('/en/') else '404.html')
        content = page.read_bytes()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        if self.command != 'HEAD': self.wfile.write(content)
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8899)
    args = parser.parse_args()
    print(f'Local preview: http://127.0.0.1:{args.port}/?lang=zh', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
