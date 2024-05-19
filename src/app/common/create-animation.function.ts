import { inject } from "@angular/core";
import { globalVariables } from "./global_variables";
import { SharedDataService } from "./shared-data.service";

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

export interface Transformation {
    transform?: string,
    scale: number,
    translate: string,
    opacity: number,
    offset: number
}

export interface Scene {
    description: {
        background: Picture | null,
        screen: Picture | null,
        midground: Picture | null,
        foreground: Picture | null,
    },
    name: any,
    from_time: any,
    animation_time: any,
}

export interface Movie {
    movie: Scene[]

}

export interface Picture {
    resource: string;
    transform: Transform[]
}

export function handleData(data: any, nameOption?: boolean): AnimationPlayer[] {
    let animationPlayers: AnimationPlayer[] = [];
    if (nameOption) {
        data.movie.forEach(async (scene: Scene) => {
            scene.description.background != null ? animationPlayers.push(await createImage(scene.name, "background")) :
                console.log(`${scene.name}'s background is null`);
            let screenResource = "";
            if (scene.description.screen !== null) {
                let position = scene.description.screen.resource.indexOf(".png");
                screenResource =
                    scene.description.screen.resource.substring(0, position) +
                    `_${globalVariables.usedOs === "mac" ? globalVariables.usedOs : "windows"}` +
                    scene.description.screen.resource.substring(position);
            }
            scene.description.screen != null ? animationPlayers.push(await createImage(scene.name, "screen")) :
                console.log(`${scene.name}'s screen is null`);
            scene.description.midground != null ? animationPlayers.push(await createImage(scene.name, "midground")) :
                console.log(`${scene.name}'s midground is null`);
            scene.description.foreground != null ? animationPlayers.push(await createImage(scene.name, "foreground")) :
                console.log(`${scene.name}'s foreground is null`);
        });
    } else {
        data.movie.forEach(async (scene: Scene) => {
            scene.description.background != null ? animationPlayers.push(await createImage(scene.name, "background")) :
                console.log(`${scene.name}'s background is null`);
            scene.description.screen != null ? animationPlayers.push(await createImage(scene.name, "screen")) :
                console.log(`${scene.name}'s screen is null`);
            scene.description.midground != null ? animationPlayers.push(await createImage(scene.name, "midground")) :
                console.log(`${scene.name}'s midground is null`);
            scene.description.foreground != null ? animationPlayers.push(await createImage(scene.name, "foreground")) :
                console.log(`${scene.name}'s foreground is null`);
        });
    }
    return animationPlayers;
}

export async function asyncHandleData(data: Movie, nameOption?: boolean): Promise<AnimationPlayer[]> {
    let animationPlayers: AnimationPlayer[] = [];
    if (nameOption) {
        data.movie.forEach(async (scene: Scene) => {
            scene.description.background != null ? animationPlayers.push(await createImage(scene, "background")) :
                console.log(`${scene}'s background is null`);
            let screenResource = "";
            if (scene.description.screen !== null) {
                let position = scene.description.screen.resource.indexOf(".png");
                screenResource =
                    scene.description.screen.resource.substring(0, position) +
                    `_${globalVariables.usedOs === "mac" ? globalVariables.usedOs : "windows"}` +
                    scene.description.screen.resource.substring(position);
            }
            scene.description.screen != null ? animationPlayers.push(await createImage(scene, "screen")) :
                console.log(`${scene}'s screen is null`);
            scene.description.midground != null ? animationPlayers.push(await createImage(scene, "midground")) :
                console.log(`${scene}'s midground is null`);
            scene.description.foreground != null ? animationPlayers.push(await createImage(scene, "foreground")) :
                console.log(`${scene}'s foreground is null`);
        });
    } else {
        data.movie.forEach(async (scene: Scene) => {
            scene.description.background != null ? animationPlayers.push(await createImage(scene, "background")) :
                console.log(`${scene}'s background is null`);
            scene.description.screen != null ? animationPlayers.push(await createImage(scene, "screen")) :
                console.log(`${scene}'s screen is null`);
            scene.description.midground != null ? animationPlayers.push(await createImage(scene, "midground")) :
                console.log(`${scene}'s midground is null`);
            scene.description.foreground != null ? animationPlayers.push(await createImage(scene, "foreground")) :
                console.log(`${scene}'s foreground is null`);
        });
    }
    return animationPlayers;
}

export async function createImage( scene: Scene, id: string): Promise<AnimationPlayer> {
    //https://storage.googleapis.com/sbox-parallax/phishing/imgs/phishing_email.png
    const resource: string = scene.description.background!.resource.replace(globalVariables.bucketUrlPrefix, globalVariables.gsBucketUrlPrefix);
    const transform: Transform[] = scene.description.background!.transform;
    const fromTime: number = scene.from_time;
    const animationTime: number = scene.animation_time;
    const sharedDataService = inject(SharedDataService);
    //let imageTag = `<img id=\"${scene}-${id}\" class=\"animated-image\" src=\"${resource}\" width=\"1200\" height=\"675\" alt=\"${id}\" />`;
    let imageTag = `<img id=\"${scene.name}-${id}\" class=\"animated-image\" width=\"1200\" height=\"675\" alt=\"${id}\" />`;
    const imageElement = document.getElementById(`${scene.name}-${id}`) as HTMLImageElement;
    const imageFile = await sharedDataService.getAnimationFile(resource);
    imageElement.src = URL.createObjectURL(imageFile);
    var container = document.getElementById("container");
    container!.insertAdjacentHTML('beforeend',imageTag);
    const animationOptions: KeyframeEffectOptions = {
        duration: animationTime*1000,
        fill: "both",
        easing: "linear",
        delay: fromTime*1000
    };
    let transformation: Keyframe[] = [];
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
    const animation = new KeyframeEffect(document.getElementById(`${scene.name}-${id}`),transformation, animationOptions);
    const animationPlayer = new Animation(animation);
    animationPlayer.play();
    animationPlayer.pause();
    //this.animationPlayers.push({animationPlayer: animationPlayer, elementId: `${scene}-${id}`});
    return {animationPlayer: animationPlayer, elementId: `${scene.name}-${id}`};
}