<ul class="fi-sidebar-nav-groups fi-logout-wrap">
    <li class="fi-sidebar-group">
        <ul class="fi-sidebar-group-items">
            <li class="fi-sidebar-item fi-logout-item">
                <a
                    href="{{ route('admin.logout') }}"
                    class="fi-sidebar-item-btn"
                >
                    <x-filament::icon
                        icon="heroicon-o-arrow-right-on-rectangle"
                        class="fi-sidebar-item-icon"
                    />

                    <span
                        x-show="$store.sidebar.isOpen"
                        class="fi-sidebar-item-label"
                    >
                        Salir
                    </span>
                </a>
            </li>
        </ul>
    </li>
</ul>

<style>
    .fi-logout-item .fi-sidebar-item-icon,
    .fi-logout-item .fi-sidebar-item-label {
        color: #dc2626;
    }

    .fi-logout-item .fi-sidebar-item-btn:hover {
        background-color: #fef2f2;
    }

    .dark .fi-logout-item .fi-sidebar-item-icon,
    .dark .fi-logout-item .fi-sidebar-item-label {
        color: #f87171;
    }

    .dark .fi-logout-item .fi-sidebar-item-btn:hover {
        background-color: rgba(248, 113, 113, 0.12);
    }
</style>
