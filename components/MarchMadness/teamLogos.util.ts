export const getLogoUrl = (teamName: string | undefined): string =>
    `https://i.turner.ncaa.com/sites/default/files/images/logos/schools/bgl/${encodeTeamName(teamName)}.svg`;

export const encodeTeamName = (teamName: string | undefined): string => {
    switch(teamName) {
        case 'NC State':
            return 'north-carolina-st';
        case 'Saint Mary\'s (CA)':
            return 'st-marys-ca';
        case 'UNCW':
            return 'unc-wilmington';
        case 'UMES':
            return 'md-east-shore';
        case 'Omaha':
            return 'neb-omaha';
        case 'Army West Point':
            return 'Army';
        case undefined:
            return '';
        default:
            return teamName
                .toLowerCase()
                .split(' ').join('-')
                .split('(').join( '')
                .split('\'').join( '')
                .split(')').join( '')
                .split('.').join( '')
                .split('&').join( '');
    }
}