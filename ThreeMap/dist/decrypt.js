class decrypts {
    /**
     * 地图数据解码
     */
    decode(json) {
        if (!json.UTF8Encoding) {
            return json;
        }
        let encodeScale = json.UTF8Scale;
        if (!encodeScale) {
            encodeScale = 1024;
        }
        let features = json.features;

        features.forEach(feature => {
            let geometry = feature.geometry;
            let coordinates = geometry.coordinates;
            let encodeOffsets = geometry.encodeOffsets;
            coordinates.forEach((coordinate, c) => {
                if (geometry.type === 'Polygon') {
                    coordinates[c] = this.decodePolygon(coordinate, encodeOffsets[c], encodeScale);
                } else if (geometry.type === 'MultiPolygon') {
                    coordinate.forEach((polygon, c2) => {
                        coordinate[c2] = this.decodePolygon(polygon, encodeOffsets[c][c2], encodeScale);
                    });
                }
            });
        });
        // Has been decoded
        json.UTF8Encoding = false;
        return json;
    }

    /**
     * @desc 解码
     */
    decodePolygon(coordinate, encodeOffsets, encodeScale) {
        const result = [];
        let prevX = encodeOffsets[0];
        let prevY = encodeOffsets[1];

        for (let i = 0; i < coordinate.length; i += 2) {
            let x = coordinate.charCodeAt(i) - 64;
            let y = coordinate.charCodeAt(i + 1) - 64;
            // ZigZag decoding
            x = (x >> 1) ^ -(x & 1);
            y = (y >> 1) ^ -(y & 1);
            // Delta deocding
            x += prevX;
            y += prevY;

            prevX = x;
            prevY = y;
            // Dequantize
            result.push([x / encodeScale, y / encodeScale]);
        }
        return result;
    }
}

export const decrypt = new decrypts();