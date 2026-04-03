import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3 font-sans">The Ethics Reporter</h3>
            <p className="text-sm leading-relaxed">
              Independent legal ethics journalism — holding the legal profession accountable.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 font-sans">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/tip" className="hover:text-white transition-colors">Submit a Tip</Link></li>
              <li><Link href="/donate" className="hover:text-white transition-colors">Donate</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 font-sans">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.instagram.com/the_ethics_reporter/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/61580604840026" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://x.com/EthicsThe79114" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@ethics_reporter234" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a href="/feed.xml" className="text-sm hover:text-white transition-colors">RSS Feed</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {year} The Ethics Reporter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
