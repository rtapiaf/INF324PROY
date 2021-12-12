const canvas = document.getElementById("container");
const gl = canvas.getContext("webgl2");

//CLEAR SCREEN

//Color de fondo
gl.clearColor(179/255, 179/255, 179/255, 1);
//mascara y el buffer de color
gl.clear(gl.COLOR_BUFFER_BIT);

//DECLARE SHADER

//construimos el shader que es el encargado de trabajar con graficos
//le decimos que utilizara webgl2 basado en opengl v3.0 es para el renderizado en equipos con bajos recursos
// la precision se usa de acuerdo al requerimiento puede ser higth si se necesita alta presicion
//el vertesShader se encarga de posicionar los vertices para formar una geometria
//in color entrada de color
//out vColor salida de color
//se tiene una funcion main para que pueda ejecutarse el shader
const vertexShader = `#version 300 es
    precision mediump float;

    in vec2 position;
    in vec3 color;
    out vec3 vColor;

    void main()
    {
        gl_Position = vec4(position.x, position.y, 0, 1);
        vColor = color;
    }
`;
//el fragment le da color a esos vertices
//out indica que es una variable de salida, se utiliza en las versiones nuevas de webgl3
//in vColor entrada de color del vertex
// es vector 4 porque usa RGBA
const fragmentShader = `#version 300 es
    precision mediump float;

    in vec2 position;

    out vec4 fragColor;
    in vec3 vColor;

    void main()
    {
        fragColor = vec4(vColor,1);
    }
`;

//COMPILE SHADER

//creamos el programa para el shader, con reservas de memoria
const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

//creamos el source para que los enlace
gl.shaderSource(vs, vertexShader);
gl.shaderSource(fs, fragmentShader);

//los compilamos
gl.compileShader(vs);
gl.compileShader(fs);

//comprobamos que esten bien
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    //imprime que error sucedio
    console.error(gl.getShaderInfoLog(vs));
}
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    //imprime que error sucedio
    console.error(gl.getShaderInfoLog(fs));
}

//creamos el programa con los shader atachados
const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

//comprobamos que este bien el programa
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    //imprime que error sucedio
    console.error(gl.getShaderInfoLog(program));
}

//con eso ya se puede comenzar a utilizar el shader
gl.useProgram(program);

//en webgl se trabajan solo con triangulos y lineas
const triangleCoords = [
    //*********************ARBOL
    //------------COPA
    //triangulo1
    -7*0.04, 17*0.04, //0
    -12*0.04, 17*0.04,   //1
    -9.5*0.04, 23*0.04,     //2

    //triangulo2
    -5*0.04, 10*0.04, //3
    -14*0.04, 10*0.04,   //4
    -9.5*0.04, 19*0.04,     //5

    //triangulo3
    -2.5*0.04, 1.5*0.04, //6
    -16.5*0.04, 1.5*0.04,   //7
    -9.5*0.04, 13*0.04,     //8

    //triangulo4
    -1.5*0.04, -8*0.04, //9
    -17.5*0.04, -8*0.04,   //10
    -9.5*0.04, 5*0.04,     //11

    //triangulo5
    0*0.04, -16*0.04, //12
    -19*0.04, -16*0.04,   //13
    -9.5*0.04, -3.5*0.04,     //14

    //------------TRONCO
    //triangulo6
    -8*0.04, -25*0.04, //15
    -11*0.04, -25*0.04,   //16
    -8*0.04, -16*0.04,     //17

    //triangulo7
    -8*0.04, -16*0.04, //18
    -11*0.04, -16*0.04,   //19
    -11*0.04, -25*0.04,     //20

    //*********************REGALOS
    //-----REGALO_1_1
    -25*0.04, -15.5*0.04,     //21
    -25*0.04, -21.5*0.04,     //22
    -21.5*0.04, -22*0.04,     //23
    -21.5*0.04, -15.5*0.04,     //24
    -22*0.04, -14.5*0.04,     //25
    //-----REGALO_1_2
    -18.5*0.04, -15*0.04,     //26
    -18.5*0.04, -18.5*0.04,     //27
    -21.5*0.04, -18.5*0.04,     //28
    -21.5*0.04, -15.5*0.04,     //29
    -22*0.04, -14.5*0.04,     //30

    //-----REGALO_2_1
    -21.5*0.04, -18.5*0.04,     //31
    -21.5*0.04, -22*0.04,     //32
    -19.5*0.04, -23*0.04,     //33
    -19.5*0.04, -19.5*0.04,     //34
    -18.5*0.04, -18.5*0.04,     //35
    //-----REGALO_2_2
    -18*0.04, -19*0.04,     //36
    -18*0.04, -22*0.04,     //37
    -19.5*0.04, -23*0.04,     //38
    -19.5*0.04, -19.5*0.04,     //39
    -18.5*0.04, -18.5*0.04,     //40

    //-----REGALO_3
    -18*0.04, -21*0.04,     //41
    -17.5*0.04, -22.5*0.04,     //42
    -16.5*0.04, -24*0.04,     //43
    -13*0.04, -19.5*0.04,     //44
    -14.5*0.04, -17.5*0.04,     //45

    //-----REGALO_4
    -14*0.04, -21*0.04,     //46
    -14*0.04, -25*0.04,     //47
    -9*0.04, -25*0.04,     //48
    -9*0.04, -21*0.04,     //49
    -9.5*0.04, -19.5*0.04,     //50
    -13*0.04, -19.5*0.04,     //51

    //*********************MESA
    //-----MESA_1
    25*0.04, -7.5*0.04,     //52
    25*0.04, -8.5*0.04,     //53
    24.5*0.04, -8.5*0.04,     //54
    -0.5*0.04, -8.5*0.04,     //55
    -0.5*0.04, -8*0.04,     //56
    -1*0.04, -7.5*0.04,     //57
    -1*0.04, -6.5*0.04,     //58
    22*0.04, -6.5*0.04,     //59
    //-----MESA_2
    24.5*0.04, -8.5*0.04,     //60
    24.5*0.04, -19*0.04,     //61
    -0.5*0.04, -19*0.04,     //62
    -0.5*0.04, -8.5*0.04,     //63
    //-----MESA_3
    24.5*0.04, -19*0.04,     //64
    24.5*0.04, -20*0.04,     //65
    23.5*0.04, -20*0.04,     //66
    23.5*0.04, -19*0.04,     //67
    //-----MESA_4
    0.5*0.04, -19*0.04,     //68
    0.5*0.04, -20*0.04,     //69
    -0.5*0.04, -20*0.04,     //70
    -0.5*0.04, -19*0.04,     //71
    //-----MESA_Espacio
    23.5*0.04, -13*0.04,     //72
    23.5*0.04, -18*0.04,     //73
    0.5*0.04, -18*0.04,     //74
    0.5*0.04, -13*0.04,     //75
 
    //*********************CAJAS
    //-----CAJA_1_1
    23*0.04, -14.5*0.04,     //76
    23*0.04, -15*0.04,     //77
    15*0.04, -15*0.04,     //78
    15*0.04, -14.5*0.04,     //79
    15.5*0.04, -13.5*0.04,     //80
    22*0.04, -13.5*0.04,     //81
    //-----CAJA_1_2
    22.5*0.04, -15*0.04,     //82
    22.5*0.04, -18*0.04,     //83
    15.5*0.04, -18*0.04,     //84
    15.5*0.04, -15*0.04,     //85

    //-----CAJA_2_1
    14.5*0.04, -14.5*0.04,     //86
    14.5*0.04, -15*0.04,     //87
    6.5*0.04, -15*0.04,     //88
    6.5*0.04, -14.5*0.04,     //89
    7*0.04, -13.5*0.04,     //90
    14*0.04, -13.5*0.04,     //91
    //-----CAJA_2_2
    14*0.04, -15*0.04,     //92
    14*0.04, -18*0.04,     //93
    7*0.04, -18*0.04,     //94
    7*0.04, -15*0.04,     //95

    //*********************REGALOS_2
    //REGALO_5
    5*0.04, -14.5*0.04,     //96
    5*0.04, -22.5*0.04,     //97
    0.5*0.04, -23*0.04,     //98
    -3*0.04, -22.5*0.04,     //99
    -3*0.04, -14.5*0.04,     //100
    0*0.04, -14*0.04,     //101

    //REGALO_6
    0.5*0.04, -19*0.04,     //102
    0.5*0.04, -24*0.04,     //103
    -2*0.04, -24.5*0.04,     //104
    -4.5*0.04, -24*0.04,     //105
    -4.5*0.04, -19*0.04,     //106
    -2*0.04, -18.5*0.04,     //107

    //*********************CANDELABROS
    //PORTAVELAS_1
    16*0.04, -7.5*0.04,     //108
    19*0.04, -7.5*0.04,     //109
    17.5*0.04, -6*0.04,     //110
    17.5*0.04, -6*0.04,     //111
    17*0.04, -5*0.04,     //112
    18*0.04, -5*0.04,     //113
    17*0.04, -5*0.04,     //114
    18*0.04, -5*0.04,     //115
    17.5*0.04, -2*0.04,     //116
    17.5*0.04, -2*0.04,     //117
    16.5*0.04, -0.5*0.04,     //118
    18.5*0.04, -0.5*0.04,     //119
    //PORTAVELAS_2
    1*0.04, -7.5*0.04,     //120
    4*0.04, -7.5*0.04,     //121
    2.5*0.04, -6*0.04,     //122
    2.5*0.04, -6*0.04,     //123
    2*0.04, -5*0.04,     //124
    3*0.04, -5*0.04,     //125
    2*0.04, -5*0.04,     //126
    3*0.04, -5*0.04,     //127
    2.5*0.04, -2*0.04,     //128
    2.5*0.04, -2*0.04,     //129
    1.5*0.04, -0.5*0.04,     //130
    3.5*0.04, -0.5*0.04,     //131
    //LAMPARA
    //base
    7.5*0.04, -6*0.04,     //132
    12.5*0.04, -6*0.04,     //133
    12.5*0.04, -7.5*0.04,     //134
    7.5*0.04, -7.5*0.04,     //135
    //parante1
    8*0.04, -2.5*0.04,     //136
    8.5*0.04, -2.5*0.04,     //137
    8.5*0.04, -6*0.04,     //138
    8*0.04, -6*0.04,     //139
    //parante2
    9*0.04, -2.5*0.04,     //140
    9.5*0.04, -2.5*0.04,     //141
    9.5*0.04, -6*0.04,     //142
    9*0.04, -6*0.04,     //143
    //parante3
    10.5*0.04, -2.5*0.04,     //144
    11*0.04, -2.5*0.04,     //145
    11*0.04, -6*0.04,     //146
    10.5*0.04, -6*0.04,     //147
    //parante4
    11.5*0.04, -2.5*0.04,     //148
    12*0.04, -2.5*0.04,     //149
    12*0.04, -6*0.04,     //150
    11.5*0.04, -6*0.04,     //151
    //tapa
    8*0.04, -2.5*0.04,     //152
    12*0.04, -2.5*0.04,     //153
    12*0.04, -2*0.04,     //154
    10.5*0.04, -1*0.04,     //155
    9.5*0.04, -1*0.04,     //156
    8*0.04, -2*0.04,     //157
    //copo
    9.5*0.04, -1*0.04,     //158
    10.5*0.04, -1*0.04,     //159
    11*0.04, 0*0.04,     //160
    10.5*0.04, 0.5*0.04,     //161
    9.5*0.04, 0.5*0.04,     //162
    9*0.04, 0*0.04,     //163
    
    //CUADRO
    //externo
    5*0.04, 7*0.04,     //164
    15*0.04, 7*0.04,     //165
    15*0.04, 23*0.04,     //166
    5*0.04, 23*0.04,     //167
    //interno
    6*0.04, 8*0.04,     //168
    14*0.04, 8*0.04,     //169
    14*0.04, 22*0.04,     //170
    6*0.04, 22*0.04,     //171

    //PORTALIBROS
    6*0.04, 3.5*0.04,     //172
    14*0.04, 3.5*0.04,     //173
    14*0.04, 5.5*0.04,     //174
    6*0.04, 5.5*0.04,     //175
    //LIBRO1
    6.5*0.04, 5.5*0.04,     //176
    9.5*0.04, 5.5*0.04,     //177
    9.5*0.04, 8*0.04,     //178
    6.5*0.04, 8*0.04,     //179
    //LIBRO2
    10.5*0.04, 5.5*0.04,     //180
    13.5*0.04, 5.5*0.04,     //181
    13.5*0.04, 7*0.04,     //182
    10.5*0.04, 7*0.04,     //183
    //ETIQUETA1
    7.5*0.04, 6.5*0.04,     //184
    8.5*0.04, 6.5*0.04,     //185
    8.5*0.04, 7.5*0.04,     //186
    7.5*0.04, 7.5*0.04,     //187
    //ETIQUETA2
    11.5*0.04, 6*0.04,     //188
    12.5*0.04, 6*0.04,     //189
    12.5*0.04, 6.5*0.04,     //190
    11.5*0.04, 6.5*0.04,     //191
];

//declaramos el array de colores
const vertexColor = [
    //*********************ARBOL
    //------------COPA
    //triangulo1
    0, 1, 0,    //0
    0, 1, 0,    //1
    0, 1, 0,     //2

    //triangulo2
    0, 1, 0,    //3
    0, 1, 0,    //4
    0, 1, 0,     //5

    //triangulo3
    0, 1, 0,    //6
    0, 1, 0,    //7
    0, 1, 0,     //8

    //triangulo4
    0, 1, 0,    //9
    0, 1, 0,    //10
    0, 1, 0,     //11

    //triangulo5
    0, 1, 0,    //12
    0, 1, 0,    //13
    0, 1, 0,     //14

    //------------TRONCO
    //triangulo6
    102/255, 51/255, 0/255,    //15
    102/255, 51/255, 0/255,    //16
    102/255, 51/255, 0/255,     //17

    //triangulo7
    102/255, 51/255, 0/255,    //18
    102/255, 51/255, 0/255,    //19
    102/255, 51/255, 0/255,     //20

    //*********************REGALOS_1
    //-----REGALO_1_1
    45/255, 57/255, 81/255,     //21
    45/255, 57/255, 81/255,     //22
    45/255, 57/255, 81/255,    //23
    45/255, 57/255, 81/255,     //24
    45/255, 57/255, 81/255,     //25
    //-----REGALO_1_2
    45/255, 57/255, 81/255,     //26
    45/255, 57/255, 81/255,     //27
    45/255, 57/255, 81/255,    //28
    45/255, 57/255, 81/255,     //29
    45/255, 57/255, 81/255,     //30

    //-----REGALO_2_1
    186/255, 156/255, 54/255,     //31
    186/255, 156/255, 54/255,     //32
    186/255, 156/255, 54/255,    //33
    186/255, 156/255, 54/255,     //34
    186/255, 156/255, 54/255,     //35
    //-----REGALO_2_2
    186/255, 156/255, 54/255,     //36
    186/255, 156/255, 54/255,     //37
    186/255, 156/255, 54/255,    //38
    186/255, 156/255, 54/255,     //39
    186/255, 156/255, 54/255,     //40

    //-----REGALO_3
    146/255, 187/255, 205/255,     //41
    146/255, 187/255, 205/255,     //42
    146/255, 187/255, 205/255,    //43
    146/255, 187/255, 205/255,     //44
    146/255, 187/255, 205/255,     //45

    //-----REGALO_4
    146/255, 47/255, 44/255,     //46
    146/255, 47/255, 44/255,     //47
    146/255, 47/255, 44/255,    //48
    146/255, 47/255, 44/255,     //49
    146/255, 47/255, 44/255,     //50
    146/255, 47/255, 44/255,     //51

    //*********************MESA
    //-----MESA_1
    99/255, 81/255, 61/255,     //52
    99/255, 81/255, 61/255,     //53
    99/255, 81/255, 61/255,     //54
    99/255, 81/255, 61/255,     //55
    99/255, 81/255, 61/255,     //56
    99/255, 81/255, 61/255,     //57
    99/255, 81/255, 61/255,     //58
    99/255, 81/255, 61/255,     //59
    //-----MESA_2
    99/255, 81/255, 61/255,     //60
    99/255, 81/255, 61/255,     //61
    99/255, 81/255, 61/255,     //62
    99/255, 81/255, 61/255,     //63
    //-----MESA_3
    99/255, 81/255, 61/255,     //64
    99/255, 81/255, 61/255,     //65
    99/255, 81/255, 61/255,     //66
    99/255, 81/255, 61/255,     //67
    //-----MESA_4
    99/255, 81/255, 61/255,     //68
    99/255, 81/255, 61/255,     //69
    99/255, 81/255, 61/255,     //70
    99/255, 81/255, 61/255,     //71
    //-----MESA_Espacio
    179/255, 179/255, 179/255,     //72
    179/255, 179/255, 179/255,     //73
    179/255, 179/255, 179/255,     //74
    179/255, 179/255, 179/255,     //75

    //*********************CAJAS
    //-----CAJA_1_1
    108/255, 30/255, 30/255,     //76
    108/255, 30/255, 30/255,     //77
    108/255, 30/255, 30/255,     //78
    108/255, 30/255, 30/255,     //79
    108/255, 30/255, 30/255,     //80
    108/255, 30/255, 30/255,     //81
    //-----CAJA_1_2
    108/255, 30/255, 30/255,     //82
    108/255, 30/255, 30/255,     //83
    108/255, 30/255, 30/255,     //84
    108/255, 30/255, 30/255,     //85

    //-----CAJA_2_1
    108/255, 30/255, 30/255,     //86
    108/255, 30/255, 30/255,     //87
    108/255, 30/255, 30/255,     //88
    108/255, 30/255, 30/255,     //89
    108/255, 30/255, 30/255,     //90
    108/255, 30/255, 30/255,     //91
    //-----CAJA_2_2
    108/255, 30/255, 30/255,     //92
    108/255, 30/255, 30/255,     //93
    108/255, 30/255, 30/255,     //94
    108/255, 30/255, 30/255,     //95

    //*********************REGALOS_2
    //REGALO_5
    234/255, 164/255, 76/255,     //96
    234/255, 164/255, 76/255,     //97
    234/255, 164/255, 76/255,     //98
    234/255, 164/255, 76/255,     //99
    234/255, 164/255, 76/255,     //100
    234/255, 164/255, 76/255,     //101
    //REGALO_5
    39/255, 53/255, 79/255,     //102
    39/255, 53/255, 79/255,     //103
    39/255, 53/255, 79/255,     //104
    39/255, 53/255, 79/255,     //105
    39/255, 53/255, 79/255,     //106
    39/255, 53/255, 79/255,     //107

    //*********************CANDELABROS
    //PORTAVELAS_1
    168/255, 133/255, 31/255,     //108
    168/255, 133/255, 31/255,     //109
    168/255, 133/255, 31/255,     //110
    168/255, 133/255, 31/255,     //111
    168/255, 133/255, 31/255,     //112
    168/255, 133/255, 31/255,     //113
    168/255, 133/255, 31/255,     //114
    168/255, 133/255, 31/255,     //115
    168/255, 133/255, 31/255,     //116
    168/255, 133/255, 31/255,     //117
    168/255, 133/255, 31/255,     //118
    168/255, 133/255, 31/255,     //119
    //PORTAVELAS_2
    168/255, 133/255, 31/255,     //120
    168/255, 133/255, 31/255,     //121
    168/255, 133/255, 31/255,     //122
    168/255, 133/255, 31/255,     //123
    168/255, 133/255, 31/255,     //124
    168/255, 133/255, 31/255,     //125
    168/255, 133/255, 31/255,     //126
    168/255, 133/255, 31/255,     //127
    168/255, 133/255, 31/255,     //128
    168/255, 133/255, 31/255,     //129
    168/255, 133/255, 31/255,     //130
    168/255, 133/255, 31/255,     //131
    //LAMPARA
    //base
    151/255, 27/255, 37/255,     //132
    151/255, 27/255, 37/255,     //133
    151/255, 27/255, 37/255,     //134
    151/255, 27/255, 37/255,     //135
    //parante1
    151/255, 27/255, 37/255,     //136
    151/255, 27/255, 37/255,     //137
    151/255, 27/255, 37/255,     //138
    151/255, 27/255, 37/255,     //139
    //parante2
    151/255, 27/255, 37/255,     //140
    151/255, 27/255, 37/255,     //141
    151/255, 27/255, 37/255,     //142
    151/255, 27/255, 37/255,     //143
    //parante3
    151/255, 27/255, 37/255,     //144
    151/255, 27/255, 37/255,     //145
    151/255, 27/255, 37/255,     //146
    151/255, 27/255, 37/255,     //147
    //parante4
    151/255, 27/255, 37/255,     //148
    151/255, 27/255, 37/255,     //149
    151/255, 27/255, 37/255,     //150
    151/255, 27/255, 37/255,     //151
    //tapa
    151/255, 27/255, 37/255,     //152
    151/255, 27/255, 37/255,     //153
    151/255, 27/255, 37/255,     //154
    151/255, 27/255, 37/255,     //155
    151/255, 27/255, 37/255,     //156
    151/255, 27/255, 37/255,     //157
    //copo
    151/255, 27/255, 37/255,     //158
    151/255, 27/255, 37/255,     //159
    151/255, 27/255, 37/255,     //160
    151/255, 27/255, 37/255,     //161
    151/255, 27/255, 37/255,     //162
    151/255, 27/255, 37/255,     //163

    //CUADRO
    //externo
    126/255, 104/255, 81/255,     //164
    126/255, 104/255, 81/255,     //165
    126/255, 104/255, 81/255,     //166
    126/255, 104/255, 81/255,     //167
    //interno
    69/255, 98/255, 68/255,     //168
    69/255, 98/255, 68/255,     //169
    69/255, 98/255, 68/255,     //170
    69/255, 98/255, 68/255,     //171

    //PORTALIBROS
    126/255, 104/255, 81/255,     //172
    126/255, 104/255, 81/255,     //173
    126/255, 104/255, 81/255,     //174
    126/255, 104/255, 81/255,     //175

    //LIBRO1
    128/255, 44/255, 42/255,     //176
    128/255, 44/255, 42/255,     //177
    128/255, 44/255, 42/255,     //178
    128/255, 44/255, 42/255,     //179

    //LIBRO2
    231/255, 223/255, 210/255,     //180
    231/255, 223/255, 210/255,     //181
    231/255, 223/255, 210/255,     //182
    231/255, 223/255, 210/255,     //183

    //ETIQUETA1
    231/255, 223/255, 210/255,     //184
    231/255, 223/255, 210/255,     //185
    231/255, 223/255, 210/255,     //186
    231/255, 223/255, 210/255,     //187

    //ETIQUETA2
    128/255, 44/255, 42/255,     //188
    128/255, 44/255, 42/255,     //189
    128/255, 44/255, 42/255,     //190
    128/255, 44/255, 42/255,     //191
];

//el buffer reserva un espacio de memoria para traer una variable del shader
//en este caso creamos un bufer de posicion para mandar el array triangleCoords
const positionBuffer = gl.createBuffer();
//creamos un bufer para color
const colorBuffer = gl.createBuffer();

//GEOMETRIA
//tomamos el bufer creados y le damos que tipo de informacion tendra
//sera una array de arreglos y utilizara el bufer de posicion
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//los datos del buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords),gl.STATIC_DRAW);
//enviamos los datos al shader
const position=gl.getAttribLocation(program,'position');
//lo activamos como un array de indices
gl.enableVertexAttribArray(position);
//enviamos los indices, shader posicion, tomara los valores del array de 2 en 2 , son valores de tipo float, no sera normalizado y no utilizaremos el sprite y offset
gl.vertexAttribPointer(position, 2, gl.FLOAT, gl.FALSE,0,0);

//COLOR
//tomamos el bufer creados y le damos que tipo de informacion tendra
//sera una array de arreglos y utilizara el bufer de posicion
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//los datos del buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColor),gl.STATIC_DRAW);
//enviamos los datos al shader, nombre del programa, nombre de la entrada del shader
const color = gl.getAttribLocation(program,'color');
//lo activamos como un array de indices
gl.enableVertexAttribArray(color);
//enviamos los indices, shader posicion, tomara los valores del array de 3 en 3 , son valores de tipo float, no sera normalizado y no utilizaremos el sprite y offset
gl.vertexAttribPointer(color, 3, gl.FLOAT, gl.FALSE,0,0);

// utilizaremos triangulos, vertice de inicio, total de vertices
//arbol
gl.drawArrays(gl.TRIANGLES, 0, 21);
//regalo1
gl.drawArrays(gl.TRIANGLE_FAN, 21, 5);
gl.drawArrays(gl.TRIANGLE_FAN, 26, 5);
//regalo2
gl.drawArrays(gl.TRIANGLE_FAN, 31, 5);
gl.drawArrays(gl.TRIANGLE_FAN, 36, 5);
//regalo3
gl.drawArrays(gl.TRIANGLE_FAN, 41, 5);
//regalo4
gl.drawArrays(gl.TRIANGLE_FAN, 46, 6);
//MESA
gl.drawArrays(gl.TRIANGLE_FAN, 52, 8);
gl.drawArrays(gl.TRIANGLE_FAN, 60, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 64, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 68, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 72, 4);
//CAJAS
//CAJA1
gl.drawArrays(gl.TRIANGLE_FAN, 76, 6);
gl.drawArrays(gl.TRIANGLE_FAN, 82, 4);
//CAJA2
gl.drawArrays(gl.TRIANGLE_FAN, 86, 6);
gl.drawArrays(gl.TRIANGLE_FAN, 92, 4);
//REGALOS
//regalo5
gl.drawArrays(gl.TRIANGLE_FAN, 96, 6);
//regalo6
gl.drawArrays(gl.TRIANGLE_FAN, 102, 6);
//CANDELABROS
//Candelabros
gl.drawArrays(gl.TRIANGLES, 108, 24);
//LAMPARA
//base
gl.drawArrays(gl.TRIANGLE_FAN, 132, 4);
//parante1
gl.drawArrays(gl.TRIANGLE_FAN, 136, 4);
//parante2
gl.drawArrays(gl.TRIANGLE_FAN, 140, 4);
//parante3
gl.drawArrays(gl.TRIANGLE_FAN, 144, 4);
//parante4
gl.drawArrays(gl.TRIANGLE_FAN, 148, 4);
//tapa
gl.drawArrays(gl.TRIANGLE_FAN, 152, 6);
//copo
gl.drawArrays(gl.TRIANGLE_FAN, 158, 6);
//CUADRO
//externo
gl.drawArrays(gl.TRIANGLE_FAN, 164, 4);
//interno
gl.drawArrays(gl.TRIANGLE_FAN, 168, 4);
//PORTALIBROS
gl.drawArrays(gl.TRIANGLE_FAN, 172, 4);
//LIBRO1
gl.drawArrays(gl.TRIANGLE_FAN, 176, 4);
//LIBRO2
gl.drawArrays(gl.TRIANGLE_FAN, 180, 4);
//ETIQUETA1
gl.drawArrays(gl.TRIANGLE_FAN, 184, 4);
//ETIQUETA2
gl.drawArrays(gl.TRIANGLE_FAN, 188, 4);