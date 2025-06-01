import Scene0 from './scenes/scene-0.json'


const scenes = [
    Scene0
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

