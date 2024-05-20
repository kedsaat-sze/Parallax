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

export interface Scene {
    description: {
        background: Picture | null,
        screen: Picture | null,
        midground: Picture | null,
        foreground: Picture | null
    },
    name: any,
    from_time: any,
    animation_time: any
}

export interface Movie {
    movie: Scene[]
}

export interface Picture {
    resource: string;
    transform: Transform[]
}

export function handleData(data: Movie, nameOption?: boolean) {
    if (nameOption) {
        data.movie.forEach((scene: Scene) => {
            scene.description.background != null ?
                createImage(scene, "background", scene.description.background) : console.log(`${scene.name}'s background is null`);
            if (scene.description.screen !== null) {
                let screenResource = "";
                let position = scene.description.screen.resource.indexOf(".png");
                screenResource = scene.description.screen.resource.substring(0, position) +
                    `_${globalVariables.usedOs === "mac" ? globalVariables.usedOs : "windows"}` + scene.description.screen.resource.substring(position);
                scene.description.screen.resource = screenResource;
            }
            scene.description.screen != null ?
                createImage(scene, "screen", scene.description.screen) : console.log(`${scene.name}'s screen is null`);
            scene.description.midground != null ?
                createImage(scene, "midground", scene.description.midground) : console.log(`${scene.name}'s midground is null`);
            scene.description.foreground != null ?
                createImage(scene, "foreground", scene.description.foreground) : console.log(`${scene.name}'s foreground is null`);
        });
    } else {
        data.movie.forEach((scene: Scene) => {
            scene.description.background != null ?
                createImage(scene, "background", scene.description.background) : console.log(`${scene.name}'s background is null`);
            scene.description.screen != null ?
                createImage(scene, "screen", scene.description.screen) : console.log(`${scene.name}'s screen is null`);
            scene.description.midground != null ?
                createImage(scene, "midground", scene.description.midground) : console.log(`${scene.name}'s midground is null`);
            scene.description.foreground != null ?
                createImage(scene, "foreground", scene.description.foreground) : console.log(`${scene.name}'s foreground is null`);
        });
    }
}

export function createImage( scene: Scene, id: string, picture: Picture) {
    let imageTag = `<img id=\"${scene.name}-${id}\" class=\"animated-image\" src=\"${picture.resource}\" width=\"1200\" height=\"675\" alt=\"${scene.name}-${id}\" />`;
    var container = document.getElementById("container");
    container!.insertAdjacentHTML('beforeend',imageTag);
    const animationOptions: KeyframeEffectOptions = {
        duration: scene.animation_time*1000,
        fill: "both",
        easing: "linear",
        delay: scene.from_time*1000
    };
    let transformation: Keyframe[] = [];
    picture.transform.forEach((item) => {
        transformation.push({
            transform: item.transform.length > 0 ? item.transform : "",
            scale: item.scale,
            translate: `${item.position.x}px ${item.position.y}px`,
            opacity: item.opacity,
            offset: item.percent === 0 ? 0 : item.percent/100
        });
    });
    const animation = new KeyframeEffect(document.getElementById(`${scene.name}-${id}`),transformation, animationOptions);
    const animationPlayer = new Animation(animation);
    animationPlayer.play();
    animationPlayer.pause();
    return;
}