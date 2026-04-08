const socials = [
    { name: "BlueSky", href: "https://bsky.app/profile/cassii.us" },
    { name: "YouTube", href: "https://www.youtube.com/@cassiius" },
    { name: "Twitch", href: "https://www.twitch.tv/cassiius" },
];

const Footer = () => {
    return (
        <footer className="border-t border-border mt-auto bg-bg-secondary/50 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
                <span>Barely Conscious Games &copy; {new Date().getFullYear()}</span>

                <div className="flex items-center gap-4">
                    {socials.map((s) => (
                        <a
                            key={s.name}
                            className="hover:text-accent transition-colors"
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {s.name}
                        </a>
                    ))}
                    <span className="text-border">|</span>
                    <a
                        className="hover:text-accent transition-colors"
                        href="https://github.com/barelyconscious/website"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Source
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
