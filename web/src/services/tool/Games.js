import Scene0 from './scenes/scene-0.json'
import Scene1 from './scenes/scene-1.json'

/*
tengo un rink de hockey en 3d, las coordenadas de las desde el centro 0,0,0 son: 22.5  y 13.5. es decir
el rectangulo tiene los vertices en :
-22.5, -13.5
-22.5, 13.5
22.5, -13.5
22.5, 13.5

reparte la posicion de 8 jugadores, 4 por equipo , por el campo en una situacion real de juego.
dame para cada jugador un json :

 {
            "name": "player-g-1",
            "loc": {
                "x": 7.08,
                "z": -2.84
            }
        },

donde en el nombre aparece  -g- , -h- : home o guest y el numero de jugador:
1,2,3,4


 el portero va aparte, son 2 defensas y 2 delanteros, que pueden estar adelantados, haberse quedado atras, desmarcarse, etc..
*/

const scenes = [
    Scene0, Scene1
].map(sceneJson => {

    const players = {};
    sceneJson.assets.forEach(assetItem => {
        players[assetItem.name] = {
            x: assetItem.loc.x,
            z: assetItem.loc.z,
            isFirst: sceneJson.meta.first  === assetItem.name
        }
    })


    return {
        id: sceneJson.meta.name,
        "limits": {
            "x": 22.5,
            "z": 13.5
        },
        players: players
    }
})


export default scenes;

