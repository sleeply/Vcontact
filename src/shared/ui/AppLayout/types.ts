export interface ILayoutConfig {
  ripple: boolean;
  darkTheme: boolean | string;
  inputStyle: string;
  menuMode: string;
  theme: string;
  scale: number;
  activeMenuItem: unknown | null;
}

export interface ILayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

export interface IAppMenuItem {
  label: string;
  items?: IAppMenuItems[];
  separator?: unknown;
}
export interface IAppMenuItems {
  label: string;
  icon?: string;
  to?: string;
  badge?: string;
  url?: string;
  target?: string;
  class?: string;
  preventExact?: boolean;
  visible?: string;
  items?: IAppMenuItems[];
  disabled?: boolean;
}
