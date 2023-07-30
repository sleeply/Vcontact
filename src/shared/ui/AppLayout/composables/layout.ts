import { toRefs, reactive, computed, ref } from "vue";
import type { ILayoutConfig, ILayoutState } from "../types";

const layoutConfig: ILayoutConfig = reactive({
  ripple: false,
  darkTheme: false,
  inputStyle: "outlined",
  menuMode: "static",
  theme: "lara-light-indigo",
  scale: 14,
  activeMenuItem: null,
});

const routerTransition = ref('')

const layoutState: ILayoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
});

export function useLayout() {
  const changeThemeSettings = (theme: string, darkTheme: boolean) => {
    layoutConfig.darkTheme = darkTheme;
    layoutConfig.theme = theme;
  };

  const setScale = (scale: number) => {
    layoutConfig.scale = scale;
  };

  const setActiveMenuItem = (item: any) => {
    layoutConfig.activeMenuItem = item.value || item;
  };

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const logoUrl = computed(() => {
    return `../images/${
      layoutConfig.darkTheme ? "logo-white" : "logo-dark"
    }.svg`;
  });

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    changeThemeSettings,
    setScale,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem,
    logoUrl,
  };
}
