import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MENU_LOGO from '../../assets/images/menu-logo.png';

const NavLink = ({ to, children, onClick, isCTA }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (to.startsWith('/#')) {
            e.preventDefault();
            if (location.pathname === '/') {
                const elementId = to.replace('/#', '');
                const element = document.getElementById(elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                navigate(to);
            }
        } else {
            window.scrollTo(0, 0);
        }
        if (onClick) onClick();
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-4 py-2"
        >
            <div className="relative">
                {/* Background layer with gradient border */}
                <div className={`
                    absolute inset-0 rounded-full 
                    bg-gradient-to-r 
                    ${isCTA
                    ? 'from-red-600 via-red-500 to-red-600 opacity-100'
                    : 'from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100'
                } 
                    blur transition-all duration-300
                `} />

                {/* Main button container - Fixed position */}
                <div className="relative rounded-full overflow-hidden">
                    {/* Background with animations */}
                    <div className={`
                        rounded-full
                        absolute inset-0
                        backdrop-blur-md
                        ${isCTA
                        ? 'bg-gradient-to-r from-red-600 to-red-500'
                        : 'bg-gradient-to-r from-white/10 to-white/25'
                    }
                        transition-all duration-500
                        group-hover:border-red-500/50
                        group-hover:shadow-lg group-hover:shadow-red-500/20
                        ${isHovered ? 'scale-105' : 'scale-100'}
                    `} />

                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Text container - Fixed position */}
                    <div className="relative px-4 py-2">
                        <span className={`
                            block
                            text-sm lg:text-lg
                            font-extrabold
                            ${isCTA
                            ? 'bg-gradient-to-r from-white to-white'
                            : 'bg-gradient-to-r from-white to-white group-hover:from-red-200 group-hover:to-red-100'
                        }
                            bg-clip-text text-transparent
                            transition-colors duration-300
                            transform-gpu
                        `}>
                            {children}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const navigationLinks = [
        { to: '/#intro', label: 'L\'Événements' },
        { to: '/#program', label: 'Programmation' },
        { to: '/#history', label: 'Notre Histoire' },
        { to: '/#contact_section', label: 'Contact' },
        { to: '/gallery', label: 'Galerie' },
    ];

    const participationLink = 'https://www.helloasso.com/associations/sound-workerz/evenements/stages-wim2h';
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsVisible(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`
            fixed w-full z-50
            transition-all duration-500
            transform
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            py-2
            ${lastScrollY > 50 ? 'backdrop-blur-sm bg-black/10' : ''}
        `}>
            <nav className="">
                {/* Desktop Layout */}
                <div className="hidden lg:block relative">
                    {/* Logo Section */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                        <Link to="/" className="group relative px-4 py-2">
                        <img
                            src={MENU_LOGO}
                            alt="WIM2H"
                            className="relative h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                        />
                        </Link>
                    </div>

                    {/* Main Content with Navigation and "Je participe" */}
                    <div className="flex items-center justify-between w-full px-6">
                        {/* Centered Navigation */}
                        <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-4">
                            {navigationLinks.map((link) => (
                            <NavLink key={link.to} to={link.to}>
                                {link.label}
                            </NavLink>
                            ))}
                        </div>
                        </div>

                        {/* "Je participe" Section */}
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                            <NavLink isCTA={true} className="px-4 py-2">
                                <a 
                                    href={participationLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block text-sm lg:text-lg font-extrabold bg-gradient-to-r from-white to-white bg-clip-text text-transparent transition-colors duration-300 transform-gpu hover:text-white"
                                    >
                                    Je participe !
                                </a>
                            </NavLink>
                        </div>
                    </div>
                </div>


                {/* Mobile Layout */}
                <div className="lg:hidden flex items-center justify-between px-6">
                    <Link to="/" className="relative px-4 py-2">
                        <img
                            src={MENU_LOGO}
                            alt="WIM2H"
                            className="relative h-auto min-h-10 max-h-10  w-auto "
                            />
                    </Link>

                    <div className="flex items-center gap-2">
                        <NavLink isCTA={true}>
                            <span className="text-xs whitespace-nowrap">
                                <a 
                                    href={participationLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block text-sm lg:text-lg font-extrabold bg-gradient-to-r from-white to-white bg-clip-text text-transparent transition-colors duration-300 transform-gpu hover:text-white"
                                >
                                Je participe !
                                </a>
                            </span>
                        </NavLink>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative group p-2 overflow-hidden rounded-lg"
                            aria-label="Menu"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-red-400/30 to-red-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                            <div className="relative">
                                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 mx-4">
                        <div className="relative overflow-hidden rounded-xl backdrop-blur-2xl bg-gradient-to-b from-black/80 to-black/60 shadow-lg shadow-red-500/10">
                            <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent opacity-50" />
                            <div className="relative p-6 flex flex-col gap-6">
                                {navigationLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </header>
    );
};

export default Header;