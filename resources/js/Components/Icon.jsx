import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowRight,
    faArrowsRotate,
    faAward,
    faBars,
    faBook,
    faBullseye,
    faChartColumn,
    faCheck,
    faChevronDown,
    faClock,
    faDownload,
    faFileLines,
    faGraduationCap,
    faLayerGroup,
    faLock,
    faPlay,
    faPlus,
    faShieldHalved,
    faStar,
    faUsers,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

const icons = {
    arrow: faArrowRight,
    back: faArrowLeft,
    badge: faAward,
    bars: faBars,
    book: faBook,
    cap: faGraduationCap,
    chart: faChartColumn,
    check: faCheck,
    'chevron-down': faChevronDown,
    clock: faClock,
    close: faXmark,
    doc: faFileLines,
    download: faDownload,
    layers: faLayerGroup,
    lock: faLock,
    play: faPlay,
    plus: faPlus,
    repeat: faArrowsRotate,
    shield: faShieldHalved,
    star: faStar,
    target: faBullseye,
    users: faUsers,
    x: faXmark,
};

export default function Icon({ name, className = 'h-5 w-5' }) {
    const icon = icons[name];

    if (!icon) {
        return null;
    }

    return (
        <FontAwesomeIcon icon={icon} className={className} aria-hidden="true" />
    );
}
