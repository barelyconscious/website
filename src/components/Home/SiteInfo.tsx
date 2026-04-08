const SiteInfo = () => (
    <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">About This Site</h4>
        <p className="text-text-secondary text-sm leading-relaxed">
            Built with React &amp; Tailwind CSS, served fresh by AWS.
        </p>
        <a
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mt-2"
            href="https://github.com/barelyconscious/website"
            target="_blank"
            rel="noopener noreferrer"
        >
            View source on GitHub &rarr;
        </a>
    </div>
);

export default SiteInfo;
