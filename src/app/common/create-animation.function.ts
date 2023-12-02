import { globalVariables } from "./global_variables";

export function handleData(data: any, nameOption?: boolean): {animationPlayer: Animation, elementId: string}[] {
    let animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
    if (nameOption) {
        data.movie.forEach((movie: { description: { background: { resource: any; transform: any; } | null; screen: { resource: any; transform: any; } | null; midground: { resource: any; transform: any; } | null; foreground: { resource: any; transform: any; } | null; }; name: any; from_time: any; animation_time: any; }) => {
            movie.description.background != null ? animationPlayers.push(createImage(movie.name, "background", movie.description.background.resource, movie.description.background.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s background is null`);
            let screenResource = "";
            if (movie.description.screen !== null) {
                let position = movie.description.screen.resource.indexOf(".png");
                screenResource = movie.description.screen.resource.substring(0, position) + `_${globalVariables.usedOs === "mac" ? globalVariables.usedOs : "windows"}` + movie.description.screen.resource.substring(position);
            }
            movie.description.screen != null ? animationPlayers.push(createImage(movie.name, "screen", screenResource, movie.description.screen.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s screen is null`);
            movie.description.midground != null ? animationPlayers.push(createImage(movie.name, "midground", movie.description.midground.resource, movie.description.midground.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s midground is null`);
            movie.description.foreground != null ? animationPlayers.push(createImage(movie.name, "foreground", movie.description.foreground.resource, movie.description.foreground.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s foreground is null`);
        });
    } else {
        data.movie.forEach((movie: { description: { background: { resource: any; transform: any; } | null; screen: { resource: any; transform: any; } | null; midground: { resource: any; transform: any; } | null; foreground: { resource: any; transform: any; } | null; }; name: any; from_time: any; animation_time: any; }) => {
            movie.description.background != null ? animationPlayers.push(createImage(movie.name, "background", movie.description.background.resource, movie.description.background.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s background is null`);
            movie.description.screen != null ? animationPlayers.push(createImage(movie.name, "screen", movie.description.screen.resource, movie.description.screen.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s screen is null`);
            movie.description.midground != null ? animationPlayers.push(createImage(movie.name, "midground", movie.description.midground.resource, movie.description.midground.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s midground is null`);
            movie.description.foreground != null ? animationPlayers.push(createImage(movie.name, "foreground", movie.description.foreground.resource, movie.description.foreground.transform, movie.from_time, movie.animation_time)) : console.log(`${movie.name}'s foreground is null`);
        });
    }
    
    return animationPlayers;
}

export function createImage(
    scene: string,
    id: string,
    resource: string,
    transform: {
        percent: number,
        transform: string,
        scale: number,
        rotate: number,
        opacity: number,
        position: {
            x: number,
            y: number
        }
    }[],
    fromTime: number,
    animationTime: number): {animationPlayer: Animation, elementId: string} {
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