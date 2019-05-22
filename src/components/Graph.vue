<template>
    <canvas id="graph" />
</template>

<script>
import * as BABYLON from "babylonjs";

export default {
    props: {
        data: {
            type: String,
            default: null
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(value) {
                if (value != null) {
                    const parsed = this.parseGraph(value);
                    const centered = this.centerGraph(parsed)
                    const pathsWithRadiuses = this.createPathsWithRadiuses(centered);
                    const spheres = this.createSpheres(centered)
                    const scene = this.createScene(pathsWithRadiuses, spheres);
                }
            }
        }
    },
    methods: {
        createScene(pathesWithRadiuses, spheres) {
            var canvas = this.$el;
            var engine = new BABYLON.Engine(canvas, true);
            var scene = new BABYLON.Scene(engine);

            var camera = new BABYLON.ArcRotateCamera(
                "Camera",
                (3 * Math.PI) / 2,
                (3 * Math.PI) / 8,
                30,
                BABYLON.Vector3.Zero(),
                scene
            );

            camera.attachControl(canvas, true);

            var light = new BABYLON.HemisphericLight(
                "hemi",
                new BABYLON.Vector3(0, 50, 0),
                scene
            );
            var materialBox = new BABYLON.StandardMaterial("texture1", scene);
            materialBox.diffuseColor = new BABYLON.Color3(0.7, 0, 0); //Green

            for (var pathWithRadius of pathesWithRadiuses) {
                var mesh = BABYLON.MeshBuilder.CreateTube(
                    "tube", {
                        path: pathWithRadius[0],
                        radius: 0.075,
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                        updatable: true
                    },
                    scene
                );
                mesh.material = materialBox
            }
            for (var sphere of spheres) {
                var mesh = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.15 }, scene);
                mesh.position = new BABYLON.Vector3(sphere[0], sphere[1], sphere[2]);
                mesh.material = materialBox
            }
            engine.runRenderLoop(function() {
                scene.render();
            });

            window.addEventListener("resize", function() {
                engine.resize();
            });
        },

        createSpheres(edges) {
            var spheres = [edges.map(edge => edge[0]), edges.map(edge => edge[edge.length - 1])].flat(1);
            console.log(spheres);
            return spheres;
        },

        createPathsWithRadiuses(edges) {
            var pathsWithRadius = [];
            for (var edge of edges) {
                pathsWithRadius.push(this.createPathWithRadius(edge));
            }
            return pathsWithRadius;
        },

        createPathWithRadius(edge) {
            var vectors = [];
            if (edge.length > 3) {
                var a = Math.floor(edge.length / 3);
                var b = Math.floor((edge.length / 3) * 2);
                var c = edge.length - 1;
                vectors.push(new BABYLON.Vector3(edge[0][0], edge[0][1], edge[0][2]));
                vectors.push(new BABYLON.Vector3(edge[a][0], edge[a][1], edge[a][2]));
                vectors.push(new BABYLON.Vector3(edge[b][0], edge[b][1], edge[b][2]));
                vectors.push(new BABYLON.Vector3(edge[c][0], edge[c][1], edge[c][2]));
                return [BABYLON.Curve3.CreateCubicBezier(
                    vectors[0],
                    vectors[1],
                    vectors[2],
                    vectors[3],
                    edge.length
                ).getPoints(), edge.map(p => p[3]).reduce((sum, r) => sum + r) / edge.length];
            }
            for (var p of edge) {
                vectors.push(new BABYLON.Vector3(p[0], p[1], p[2]));
            }
            return [BABYLON.Curve3.CreateCatmullRomSpline(vectors, 1).getPoints(),
                edge.map(p => p[3]).reduce((sum, r) => sum + r) / edge.length
            ];
        },

        centerGraph(edges) {
            var points = edges.flat(1);
            var cX = points.map(p => p[0]).reduce((summ, x) => summ + x) / points.length;
            var cY = points.map(p => p[1]).reduce((summ, x) => summ + x) / points.length;
            var cZ = points.map(p => p[2]).reduce((summ, x) => summ + x) / points.length;
            var res = edges.map(edge => edge.map(p => [p[0] - cX, p[1] - cY, p[2] - cZ, p[3]]));
            return res
        },

        parseGraph(text) {
            var lines = text.split("\n");
            var edges = [];
            var edge = [];
            for (var i = 0; i < lines.length; i++) {
                var words = lines[i].split(" ");
                if (words.length == 2) {
                    if (edge.length > 1) {
                        edges.push(edge);
                    }
                    edge = [];
                }
                if (words.length == 4) {
                    edge.push([
                        parseFloat(words[0]),
                        parseFloat(words[1]),
                        parseFloat(words[2]),
                        parseFloat(words[3])
                    ]);
                }
            }
            if (edge.length > 1) {
                edges.push(edge);
            }
            return edges;
        }
    }
};
</script>

<style>
#graph {
    width: 100%;
    height: 100%;
    touch-action: none;
}
</style>
