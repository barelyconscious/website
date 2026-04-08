const socials = [
    { name: "BlueSky", handle: "@cassii.us", href: "https://bsky.app/profile/cassii.us" },
    { name: "YouTube", handle: "@cassiius", href: "https://www.youtube.com/@cassiius" },
    { name: "Twitch", handle: "@cassiius", href: "https://www.twitch.tv/cassiius" },
];

const ContactMe = () => (
    <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Socials</h4>
        <ul className="space-y-3">
            {socials.map((s) => (
                <li key={s.name}>
                    <a
                        className="group flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="font-medium text-text-primary group-hover:text-accent transition-colors">{s.name}</span>
                        <span className="text-text-muted text-sm">{s.handle}</span>
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

export default ContactMe;
