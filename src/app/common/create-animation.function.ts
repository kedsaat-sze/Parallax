import { globalVariables } from "./global_variables";

export interface AnimationPlayer {
    animationPlayer: Animation,
    elementId: string
}

export interface Transform {
    percent: number,
    transform: string,
    scale: number,
    rotate: number,
    opacity: number,
    position: {
        x: number,
        y: number
    }
}

export interface Picture {
    resource: string;
    transform: Transform[]
}

export function handleData(data: any, nameOption?: boolean): AnimationPlayer[] {
    let animationPlayers: AnimationPlayer[] = [];
    if (nameOption) {
        data.movie.forEach((scene: { description: { background: Picture | null; screen: Picture | null;
        midground: Picture | null; foreground: Picture | null; }; name: any; from_time: any; animation_time: any; }) => {
            scene.description.background != null ? animationPlayers.push(createImage(scene.name, "background", scene.description.background.resource,
            scene.description.background.transform, scene.from_time, scene.animation_time)) : console.log(`${scene.name}'s background is null`);
            let screenResource = "";
            if (scene.description.screen !== null) {
                let position = scene.description.screen.resource.indexOf(".png");
                screenResource = scene.description.screen.resource.substring(0, position) + `_${globalVariables.usedOs === "mac" ? globalVariables.usedOs : "windows"}` +
                scene.description.screen.resource.substring(position);
            }
            scene.description.screen != null ?
                animationPlayers.push(createImage(scene.name, "screen", screenResource, scene.description.screen.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s screen is null`);
            scene.description.midground != null ?
                animationPlayers.push(createImage(scene.name, "midground", scene.description.midground.resource, scene.description.midground.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s midground is null`);
            scene.description.foreground != null ?
                animationPlayers.push(createImage(scene.name, "foreground", scene.description.foreground.resource, scene.description.foreground.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s foreground is null`);
        });
    } else {
        data.movie.forEach((scene: { description: { background: Picture | null; screen: Picture | null;
        midground: Picture | null; foreground: Picture | null; }; name: any; from_time: any; animation_time: any; }) => {
            scene.description.background != null ?
                animationPlayers.push(createImage(scene.name, "background", scene.description.background.resource, scene.description.background.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s background is null`);
            scene.description.screen != null ?
                animationPlayers.push(createImage(scene.name, "screen", scene.description.screen.resource, scene.description.screen.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s screen is null`);
            scene.description.midground != null ?
                animationPlayers.push(createImage(scene.name, "midground", scene.description.midground.resource, scene.description.midground.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s midground is null`);
            scene.description.foreground != null ?
                animationPlayers.push(createImage(scene.name, "foreground", scene.description.foreground.resource, scene.description.foreground.transform, scene.from_time, scene.animation_time)) :
                console.log(`${scene.name}'s foreground is null`);
        });
    }
    
    return animationPlayers;
}

export function createImage( scene: string, id: string, resource: string, transform: Transform[], fromTime: number, animationTime: number): AnimationPlayer {
        let imageTag = `<img id=\"${scene}-${id}\" class=\"animated-image\" src=\"${resource}\" width=\"1200\" height=\"675\" alt=\"${id}\" />`;
        var container = document.getElementById("container");
        container!.insertAdjacentHTML('beforeend',imageTag);
        const animationOptions: KeyframeEffectOptions = {
            duration: animationTime*1000,
            fill: "both",
            easing: "linear",
            delay: fromTime*1000
        };
        let transformation: {
            transform?: string,
            scale: number,
            translate: string,
            opacity: number,
            offset: number
        }[] = [];
        transform.forEach((item) => {
            if (item.transform.length > 0) {
                transformation.push({
                transform: item.transform,
                scale: item.scale,
                translate: `${item.position.x}px ${item.position.y}px`,
                opacity: item.opacity,
                offset: item.percent === 0 ? 0 : item.percent/100
                });
            } else {
                transformation.push({
                scale: item.scale,
                opacity: item.opacity,
                translate: `${item.position.x}px ${item.position.y}px`,
                offset: item.percent === 0 ? 0 : item.percent/100
                });
            }
        });
        //add animations to images
        const animation = new KeyframeEffect(document.getElementById(`${scene}-${id}`),transformation, animationOptions);
        const animationPlayer = new Animation(animation);
        animationPlayer.play();
        animationPlayer.pause();
        //this.animationPlayers.push({animationPlayer: animationPlayer, elementId: `${scene}-${id}`});
        return {animationPlayer: animationPlayer, elementId: `${scene}-${id}`};
}