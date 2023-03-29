export const responsiveClass = (isMobile: boolean, defaultClass: string, desktopClass: string, mobileClass: string) =>
    `${defaultClass} ${isMobile ? mobileClass : desktopClass}`;