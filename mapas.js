const iconos = {
    '_': ' ',
    'O':'🎁',
    'X':'🧱',
    'I':'🎯',
    'PLAYER': '😄',
    'BOMB_COLLISION': '',
    'GAME_OVER': '❌',
    'WIN': '✅'
};

const nivel1 = [
    ['I','X','X','X','X','X','X','X','X','X'],
    ['_','_','_','X','_','X','_','_','_','_'],
    ['_','X','X','_','_','X','_','X','X','X'],
    ['_','_','X','X','_','X','X','_','X','X'],
    ['X','_','_','_','_','X','X','_','X','X'],
    ['X','O','_','_','X','X','X','_','_','X'],
    ['X','O','_','X','X','X','X','_','X','X'],
    ['X','O','_','X','X','X','X','_','X','X'],
    ['X','X','X','X','X','X','X','_','_','X'],
    ['O','X','X','X','X','X','X','X','X','X']
];

const mapas = [];
mapas.push(nivel1);

const mapas2 = [];
mapas2.push(`
    IXXXXXXXXX
    ___X_X____
    _XX__X_XXX
    __XX_XX_XX
    _XXXXXXXXX
    ___X_X____
    _XX__X_XXX
    __XX_XX_XX     
    XXXXXXOXXX
    XXXXXXXXXX
`);

mapas2.push(`
    IXXXXXXXXX
    ___X_X____
    _XX__X_XXX
    __XX_XX_XX
    _XXOXXXXXX
    ___X_X____
    _XX__X_XXX
    __XX_XX_XX     
    X____X_XXX
    XXXXXXXXXX
`);
