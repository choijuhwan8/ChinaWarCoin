import React from "react";

const SiteFooter = () => (
  <footer className="border-t border-[rgba(79,70,229,0.25)] pt-6 text-center text-sm text-[#7c81b8]">
    <p>
      ChinaWarCoin is a meme-driven experiment. Nothing on this page is a financial recommendation. Always DYOR before deploying capital.
    </p>
    <p className="mt-2">&copy; {new Date().getFullYear()} ChinaWarCoin Alliance. All rights reserved.</p>
  </footer>
);

export default SiteFooter;
