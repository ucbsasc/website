import { colors, fonts } from './colors';

const darkSpecks =
  "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260' fill='%231E1A1C' stroke='%231E1A1C'><g opacity='.32'><circle cx='84' cy='39' r='1.2' fill-opacity='0.25'/><circle cx='19' cy='139' r='0.7' fill-opacity='0.25'/><circle cx='237' cy='56' r='0.5' fill-opacity='0.6'/><circle cx='109' cy='63' r='1.0' fill-opacity='0.6'/><circle cx='150' cy='103' r='0.6' fill-opacity='0.25'/><circle cx='145' cy='35' r='0.8' fill-opacity='0.35'/><circle cx='141' cy='148' r='1.0' fill-opacity='0.35'/><circle cx='27' cy='149' r='0.6' fill-opacity='0.45'/><circle cx='25' cy='185' r='1.0' fill-opacity='0.25'/><circle cx='161' cy='129' r='1.0' fill-opacity='0.6'/><circle cx='202' cy='121' r='0.8' fill-opacity='0.45'/><circle cx='78' cy='207' r='1.2' fill-opacity='0.35'/><circle cx='21' cy='78' r='0.8' fill-opacity='0.45'/><circle cx='190' cy='75' r='0.5' fill-opacity='0.25'/><circle cx='243' cy='110' r='1.2' fill-opacity='0.25'/><circle cx='199' cy='149' r='1.6' fill-opacity='0.45'/><circle cx='88' cy='91' r='0.8' fill-opacity='0.6'/><circle cx='18' cy='24' r='0.7' fill-opacity='0.6'/><circle cx='181' cy='17' r='1.2' fill-opacity='0.45'/><circle cx='168' cy='258' r='1.6' fill-opacity='0.6'/><circle cx='74' cy='100' r='1.2' fill-opacity='0.45'/><circle cx='128' cy='57' r='0.7' fill-opacity='0.35'/><circle cx='192' cy='103' r='1.6' fill-opacity='0.6'/><circle cx='230' cy='213' r='1.6' fill-opacity='0.45'/><circle cx='249' cy='39' r='0.6' fill-opacity='0.35'/><circle cx='60' cy='61' r='0.8' fill-opacity='0.35'/><circle cx='159' cy='83' r='0.6' fill-opacity='0.25'/><circle cx='119' cy='226' r='1.6' fill-opacity='0.6'/><path d='M103 102l-1 -3' stroke-opacity='.25' stroke-width='.6'/><path d='M50 256l-2 -11' stroke-opacity='.25' stroke-width='.6'/></g></svg>";

const lightSpecks =
  "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260' fill='%23F7F0E6' stroke='%23F7F0E6'><g opacity='.4'><circle cx='156' cy='27' r='1.0' fill-opacity='0.35'/><circle cx='140' cy='247' r='1.0' fill-opacity='0.25'/><circle cx='18' cy='54' r='0.8' fill-opacity='0.35'/><circle cx='165' cy='248' r='1.0' fill-opacity='0.45'/><circle cx='123' cy='30' r='0.8' fill-opacity='0.6'/><circle cx='195' cy='192' r='0.8' fill-opacity='0.35'/><circle cx='134' cy='53' r='1.0' fill-opacity='0.45'/><circle cx='38' cy='141' r='0.5' fill-opacity='0.45'/><circle cx='254' cy='224' r='1.2' fill-opacity='0.45'/><circle cx='138' cy='203' r='0.7' fill-opacity='0.35'/><circle cx='159' cy='205' r='1.6' fill-opacity='0.35'/><circle cx='210' cy='213' r='1.2' fill-opacity='0.35'/><circle cx='52' cy='128' r='1.2' fill-opacity='0.25'/><circle cx='50' cy='157' r='0.7' fill-opacity='0.6'/><circle cx='21' cy='27' r='0.8' fill-opacity='0.35'/><circle cx='88' cy='125' r='1.0' fill-opacity='0.25'/><circle cx='125' cy='170' r='1.6' fill-opacity='0.25'/><circle cx='217' cy='31' r='0.8' fill-opacity='0.35'/><circle cx='124' cy='46' r='1.6' fill-opacity='0.45'/><circle cx='23' cy='246' r='1.2' fill-opacity='0.6'/><circle cx='44' cy='33' r='0.6' fill-opacity='0.6'/><circle cx='210' cy='38' r='1.6' fill-opacity='0.6'/><circle cx='171' cy='91' r='1.0' fill-opacity='0.35'/><circle cx='6' cy='208' r='1.2' fill-opacity='0.25'/><path d='M215 55l-7 -6' stroke-opacity='.25' stroke-width='.6'/><path d='M63 152l-7 -2' stroke-opacity='.25' stroke-width='.6'/></g></svg>";

const halftone = (rgba: string) => `radial-gradient(circle, ${rgba} 0.7px, transparent 1px)`;

/** Light pages stay clean; texture is only for the pink and black bands. */
export const lightPage = {
  backgroundColor: colors.page,
};

/** Black paper with light specks. */
export const blackPaper = {
  backgroundColor: colors.black,
  backgroundImage: `url("data:image/svg+xml,${lightSpecks}")`,
  backgroundSize: '260px 260px',
};

/** Flyer-pink paper, as on the "you belong here" slide. Ink text only. */
export const pinkPaper = {
  backgroundColor: colors.pink,
  backgroundImage: `url("data:image/svg+xml,${darkSpecks}"), ${halftone('rgba(30,26,28,0.07)')}`,
  backgroundSize: '260px 260px, 5px 5px',
};

/** Fine halftone laid over duotone photos (multiply). */
export const photoHalftone = 'radial-gradient(circle, #000 1.1px, transparent 1.8px)';

/** Spray-paint word. Keep the glow faint. */
export const graffitiSx = {
  fontFamily: fonts.graffiti,
  fontWeight: 400,
  letterSpacing: '0.01em',
  lineHeight: 0.95,
  color: colors.textOnBlack,
  textShadow: `0 0 14px rgba(255, 92, 146, 0.45), 0 0 2px rgba(255, 92, 146, 0.6)`,
} as const;
