
/* tasks
* load the model
* read data, get type, path, and time
* animate the model
* destroy the model */

let scene, camera, renderer, model1, model2;
let globalTime = 0;  // to be initialized
let timer = null;
const trajectoryData = {};  //  object trajectoryData = { 173623728: [object, object,...], 136723629: [object, object,...] }
const scene1Data = [
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-55,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-42,\"y\":-122}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 30000},
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":5,\"y\":-20}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 310000},
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":15,\"y\":-10}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 420000},

    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-10}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-33,\"y\":-58}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 30000},
    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-71,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 410000},
    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-73,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 420000},

    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-55,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 400000},
    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":5,\"y\":-20}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 550000},
    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":15,\"y\":-10}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 580000},

    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-55,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 390000},
    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":5,\"y\":-20}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 570000},
    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":15,\"y\":-10}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 590000},

    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-60,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 410000},
    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-20}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 540000},
    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":15,\"y\":-10}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 600000},

    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-60,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 445000},
    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-20}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 570000},
    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":15,\"y\":-10}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 680000},

    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-10}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 140000},
    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-71,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 410000},
    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-73,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 420000},


    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-14,\"y\":-8}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-37,\"y\":-56}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 40000},
    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-74,\"y\":-148}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 420000},
    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-76,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 480000},

    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-14,\"y\":-8}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-35,\"y\":-50}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 40000},
    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-74,\"y\":-148}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 440000},
    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-76,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 480000},

    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-14,\"y\":-8}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 150000},
    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-74,\"y\":-148}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 440000},
    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-76,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 480000},


    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-100,\"y\":-50}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":30,\"y\":-140}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 150000},
    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-100,\"y\":-50}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":30,\"y\":-140}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 100000},
    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":40,\"y\":-130}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-100,\"y\":-35}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 150000},
    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-110,\"y\":-30}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":40,\"y\":-130}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-100,\"y\":-35}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 170000},
    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-110,\"y\":-30}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":40,\"y\":-130}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-100,\"y\":-35}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 210000},
    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-110,\"y\":-30}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-104,\"y\":-54}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":34,\"y\":-146}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 140000},
    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":49,\"y\":-152}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-60,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-45,\"y\":-119}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 30000},
    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-20}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 400000},
    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":15,\"y\":-10}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 480000},

    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-50,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-37,\"y\":-125}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 30000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-34,\"y\":-118}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 50000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-27,\"y\":-115}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 60000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-24,\"y\":-114}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 70000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-130}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 80000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":30,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 100000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-180}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 480000},
]

const scene2Data = [
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 30000},
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 280000},
    {"id": 162801421, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},

    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 20000},
    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":80,\"y\":-190}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 100000},
    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},
    {"id": 162801422, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 320000},

    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 40000},
    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 130000},
    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 305000},
    {"id": 162801423, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 320000},

    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 53000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":80,\"y\":-190}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 163000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 317000},
    {"id": 162801424, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 390000},


    {"id": 162801443, "seq": 280376350, "is_moving": 0, "position": "{\"x\":4,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 54000},
    {"id": 162801443, "seq": 280376350, "is_moving": 0, "position": "{\"x\":104,\"y\":-150}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 320000},
    {"id": 162801443, "seq": 280376350, "is_moving": 0, "position": "{\"x\":107,\"y\":-143}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 330000},

    {"id": 162801444, "seq": 280376350, "is_moving": 0, "position": "{\"x\":4,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 74000},
    {"id": 162801444, "seq": 280376350, "is_moving": 0, "position": "{\"x\":104,\"y\":-150}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 340000},
    {"id": 162801444, "seq": 280376350, "is_moving": 0, "position": "{\"x\":107,\"y\":-143}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 360000},

    {"id": 162801445, "seq": 280376350, "is_moving": 0, "position": "{\"x\":4,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 104000},
    {"id": 162801445, "seq": 280376350, "is_moving": 0, "position": "{\"x\":104,\"y\":-150}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 370000},
    {"id": 162801445, "seq": 280376350, "is_moving": 0, "position": "{\"x\":107,\"y\":-143}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 390000},

    {"id": 162801446, "seq": 280376350, "is_moving": 0, "position": "{\"x\":4,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 154000},
    {"id": 162801446, "seq": 280376350, "is_moving": 0, "position": "{\"x\":104,\"y\":-150}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 400000},
    {"id": 162801446, "seq": 280376350, "is_moving": 0, "position": "{\"x\":107,\"y\":-143}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 430000},



    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 85000},
    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 195000},
    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 340000},
    {"id": 162801425, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 350000},

    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 105000},
    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 215000},
    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 360000},
    {"id": 162801426, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 370000},

    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 125000},
    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 235000},
    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 380000},
    {"id": 162801427, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 390000},

    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 145000},
    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 255000},
    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 400000},
    {"id": 162801428, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 410000},

    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 165000},
    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 275000},
    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 425000},
    {"id": 162801429, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 440000},

    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 186000},
    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 295000},
    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 445000},
    {"id": 162801430, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 450000},

    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 207000},
    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 315000},
    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 465000},
    {"id": 162801431, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 470000},

    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 228000},
    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 335000},
    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 490000},
    {"id": 162801432, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 510000},

    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 249000},
    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 355000},
    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 511000},
    {"id": 162801433, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 530000},

    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 267000},
    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 375000},
    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 530000},
    {"id": 162801434, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 550000},

    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 293000},
    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 400000},
    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 555000},
    {"id": 162801435, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 575000},

    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 310000},
    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 420000},
    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 575000},
    {"id": 162801436, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 595000},

    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 335000},
    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 445000},
    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 600000},
    {"id": 162801437, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 620000},

    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 355000},
    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 465000},
    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 620000},
    {"id": 162801438, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 640000},

    {"id": 162801439, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 375000},
    {"id": 162801439, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 485000},
    {"id": 162801439, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 640000},
    {"id": 162801439, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 660000},

    {"id": 162801440, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 395000},
    {"id": 162801440, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 505000},
    {"id": 162801440, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 660000},
    {"id": 162801440, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 680000},

    {"id": 162801441, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 415000},
    {"id": 162801441, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 525000},
    {"id": 162801441, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 680000},
    {"id": 162801441, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 700000},

    {"id": 162801442, "seq": 280376350, "is_moving": 0, "position": "{\"x\":0,\"y\":-350}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 445000},
    {"id": 162801442, "seq": 280376350, "is_moving": 0, "position": "{\"x\":50,\"y\":-250}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 555000},
    {"id": 162801442, "seq": 280376350, "is_moving": 0, "position": "{\"x\":100,\"y\":-155}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 710000},
    {"id": 162801442, "seq": 280376350, "is_moving": 0, "position": "{\"x\":105,\"y\":-150}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 730000},


    {"id": 162801447, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801447, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 20000},
    {"id": 162801447, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 530000},

    {"id": 162801448, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 20000},
    {"id": 162801448, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 140000},
    {"id": 162801448, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 560000},

    {"id": 162801449, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 40000},
    {"id": 162801449, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 160000},
    {"id": 162801449, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 570000},

    {"id": 162801450, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 70000},
    {"id": 162801450, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 190000},
    {"id": 162801450, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 610000},

    {"id": 162801451, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 90000},
    {"id": 162801451, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 210000},
    {"id": 162801451, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 630000},

    {"id": 162801452, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 110000},
    {"id": 162801452, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 230000},
    {"id": 162801452, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 650000},

    {"id": 162801453, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 130000},
    {"id": 162801453, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 250000},
    {"id": 162801453, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 670000},

    {"id": 162801454, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 150000},
    {"id": 162801454, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 270000},
    {"id": 162801454, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 690000},

    {"id": 162801455, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 180000},
    {"id": 162801455, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 300000},
    {"id": 162801455, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 710000},

    {"id": 162801456, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 200000},
    {"id": 162801456, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 320000},
    {"id": 162801456, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 730000},

    {"id": 162801457, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 220000},
    {"id": 162801457, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 340000},
    {"id": 162801457, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 760000},

    {"id": 162801458, "seq": 280376350, "is_moving": 0, "position": "{\"x\":70,\"y\":-200}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 270000},
    {"id": 162801458, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 490000},
    {"id": 162801458, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 810000},

    {"id": 162801459, "seq": 280376350, "is_moving": 0, "position": "{\"x\":95,\"y\":-150}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 290000},
    {"id": 162801459, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 510000},
    {"id": 162801459, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 830000},

    {"id": 162801460, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 0},
    {"id": 162801460, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 20000},
    {"id": 162801460, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 430000},

    {"id": 162801461, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 20000},
    {"id": 162801461, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 50000},
    {"id": 162801461, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 550000},

    {"id": 162801462, "seq": 280376350, "is_moving": 0, "position": "{\"x\":40,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 30000},
    {"id": 162801462, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 70000},
    {"id": 162801462, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 430000},

    {"id": 162801463, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 45000},
    {"id": 162801463, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 70000},
    {"id": 162801463, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 430000},

    {"id": 162801464, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 60000},
    {"id": 162801464, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 90000},
    {"id": 162801464, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 430000},

    {"id": 162801465, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 90000},
    {"id": 162801465, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 120000},
    {"id": 162801465, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 470000},

    {"id": 162801466, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 110000},
    {"id": 162801466, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 160000},
    {"id": 162801466, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 490000},

    {"id": 162801467, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 120000},
    {"id": 162801467, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 160000},
    {"id": 162801467, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 410000},

    {"id": 162801468, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 160000},
    {"id": 162801468, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 210000},
    {"id": 162801468, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 530000},

    {"id": 162801469, "seq": 280376350, "is_moving": 0, "position": "{\"x\":40,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 180000},
    {"id": 162801469, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 210000},
    {"id": 162801469, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 530000},

    {"id": 162801470, "seq": 280376350, "is_moving": 0, "position": "{\"x\":45,\"y\":-250}", "shape": "{\"x\":4.766921,\"y\":1.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 210000},
    {"id": 162801470, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-10,\"y\":-350}", "shape": "{\"x\":6.766921,\"y\":12.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 250000},
    {"id": 162801470, "seq": 280376350, "is_moving": 0, "position": "{\"x\":-13,\"y\":-354}", "shape": "{\"x\":10.766921,\"y\":19.8191735,\"z\":1.4189019}", "orientation": 1.2220109, "velocity": 0.0, "type": 1, "heading": -1.9568553, "time_meas": 630000},
]
function dataSort(jsonData) {  // sort
    const sortedData = jsonData.sort((a, b) => a.time_meas - b.time_meas);
    sortedData.forEach(item => {
        const idNum = item.id;
        if (!trajectoryData[idNum]) {
            trajectoryData[idNum] = [];
        }
        trajectoryData[idNum].push(item);
    });
}

// console.log(trajectoryData);

// initializeModels() => checkTimeStamps() => loadModels() => animateModels()
function initializeModels1(jsonData) {  // jsonData is Array [object, object,...]
    dataSort(jsonData);  // get an ordered trajectoryData
    console.log(trajectoryData);  // no problem
    console.log(jsonData);
    let minTime = Infinity;
    let maxTime = -Infinity;

    Object.entries(jsonData).forEach(([id, data]) => {
        // console.log(data.time_meas)
        if (data && typeof trajectoryData[Object.keys(trajectoryData)[0]][0].time_meas !== 'undefined') {
            // console.log(data);
            const timestamps = [data.time_meas];
            minTime = Math.min(minTime, ...timestamps);
            maxTime = Math.max(maxTime, ...timestamps);
        }
    });
    console.log(minTime);
    console.log(maxTime);
    globalTime = minTime;
    for (let key in trajectoryData) {  // let every id's flag = 0
        trajectoryData[key][0].flag = 0;
    }
    // jsonData[0]["flag"] = 0;

    timer = setInterval(checkTimeStamps1, 10, minTime, maxTime);
}


function initializeModels2(jsonData) {  // jsonData is Array [object, object,...]
    dataSort(jsonData);  // get an ordered trajectoryData
    console.log(trajectoryData);  // no problem
    console.log(jsonData);
    let minTime = Infinity;
    let maxTime = -Infinity;

    Object.entries(jsonData).forEach(([id, data]) => {
        // console.log(data.time_meas)
        if (data && typeof trajectoryData[Object.keys(trajectoryData)[0]][0].time_meas !== 'undefined') {
            // console.log(data);
            const timestamps = [data.time_meas];
            minTime = Math.min(minTime, ...timestamps);
            maxTime = Math.max(maxTime, ...timestamps);
        }
    });
    console.log(minTime);
    console.log(maxTime);
    globalTime = minTime;
    for (let key in trajectoryData) {  // let every id's flag = 0
        trajectoryData[key][0].flag = 0;
    }
    // jsonData[0]["flag"] = 0;

    timer = setInterval(checkTimeStamps2, 10, minTime, maxTime);
}


function checkTimeStamps1(minTime, maxTime) {
    globalTime += 10;
    // console.log(globalTime);

    if (globalTime >= maxTime) {
        clearInterval(timer);
        return;
    }

    Object.entries(trajectoryData).forEach(([id, dataArray]) => {
        const firstData = dataArray[0]; // get the first object
        if (firstData && typeof firstData.time_meas === 'number' && firstData.flag === 0) {
            const pathTime = getPathTime(id);
            const modelMinTime = getMinTime(id);
            const type = getType(id);  // type is an Array [type, type,...]
            loadModel(type[0], [pathTime[0].x, pathTime[0].y, pathTime[0].z], function (loadedModel) {
                animateModel1(pathTime, loadedModel, modelMinTime);
            });
            firstData.flag = 1; // model have been loaded
        }
    });
}


function checkTimeStamps2(minTime, maxTime) {
    globalTime += 1000;
    // console.log(globalTime);

    if (globalTime >= maxTime) {
        clearInterval(timer);
        return;
    }

    Object.entries(trajectoryData).forEach(([id, dataArray]) => {
        const firstData = dataArray[0]; // get the first object
        if (firstData && typeof firstData.time_meas === 'number' && firstData.flag === 0) {
            const pathTime = getPathTime(id);
            const modelMinTime = getMinTime(id);
            const type = getType(id);  // type is an Array [type, type,...]
            loadModel(type[0], [pathTime[0].x, pathTime[0].y, pathTime[0].z], function (loadedModel) {
                animateModel2(pathTime, loadedModel, modelMinTime);
            });
            firstData.flag = 1; // model have been loaded
        }
    });
}


// add the model to the scene
function loadModel(type, position, callback) { // position is an array. e.g. position = [0, 2, 4]
    const loader = new GLTFLoader();
    if (type === 1) {
        loader.load('../static/model/car_model/scene.gltf', function (gltf){
            console.log('load');
            console.log(gltf)
            const lookForward = new THREE.Vector3(1, 0, 0);

            // we need to init the looking direction
            gltf.scene.position.set(position[0], position[1], position[2]);
            gltf.scene.scale.set(0.5, 0.5, 0.5);  // to be decided
            // gltf.scene.rotateX(Math.PI/2);
            scene.add(gltf.scene);
            const axesHelper = new THREE.AxesHelper(10); // 指定轴线的长度
            // gltf.scene.add(axesHelper);
            if (callback) callback(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });
    }
}


function loadBackground(scene, callback) {
    const loader = new GLTFLoader();
    loader.load('../static/model/roads_model_final8.glb', function (gltf) {
        gltf.scene.rotateX(Math.PI/2);
        gltf.scene.rotateY(-Math.PI/6);
        gltf.scene.position.set(-26, -240, 0);
        gltf.scene.scale.set(17, 17, 17);
        scene.add(gltf.scene);
        if (callback) callback(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    })
}


function getPathTime(idNum) { // get a model's path
    const trajectory = trajectoryData[idNum];
    if (!trajectory) return [];

    return trajectory.map(point => {
        const position = JSON.parse(point.position);
        const time = JSON.parse(point.time_meas);
        return new THREE.Vector4(position.x, position.y, 1, time);
    });
}


function getType(idNum) {
    const trajectory = trajectoryData[idNum];
    if (!trajectory) return [];

    return trajectory.map(point => {
        return JSON.parse(point.type);
    })
}


function getOrientation(idNum) {
    const trajectory = trajectoryData[idNum];
    if (!trajectory) return [];

    return trajectory.map(point => {
        return JSON.parse(point.orientation);
    })
}


function getMinTime(idNum) {
    const trajectory = trajectoryData[idNum];
    if (!trajectory) return [];

    return trajectory[0].time_meas;
}


function animateModel1(pathTime, model, modelMinTime) {
    let currentSegment = 0;
    let direction = new THREE.Vector3();
    let isAnimating = true;
    let partlyTime = modelMinTime;  // not correct, should be min of model's timestamp

    function moveModel() {
        if (!model || !isAnimating) return;
        console.log('move');

        partlyTime += 500;
        const currentTime = pathTime[currentSegment].w;
        const segmentStartTime = pathTime[currentSegment].w;
        const segmentEndTime = pathTime[currentSegment + 1].w;
        const segmentDuration = segmentEndTime - segmentStartTime;
        const elapsedTime = partlyTime - currentTime;

        const t = (currentTime - segmentStartTime) / segmentDuration;

        if (elapsedTime >= segmentEndTime) {
            currentSegment++;
            if (currentSegment >= pathTime.length - 1) {
                destroyModel();
                return;
            }
        }

        // lerp() is linear interpolation
        direction.copy(pathTime[currentSegment].clone().lerp(pathTime[currentSegment + 1], t).setComponent(3, 0));
        // console.log('fff');

        direction.sub(model.position).normalize();
        model.position.add(direction.multiplyScalar(0.25));

        // we need to change the direction the model is looking at

        const nextPosition = pathTime[currentSegment + 1];
        const modelDirection = nextPosition.clone().sub(model.position).normalize();

        // 使用模型的朝向向量创建一个目标方向向量（可以根据需要调整）
        const targetDirection = new THREE.Vector3(0, 1, 0); // 这里假设模型初始朝向是 z 轴正方向

        // 使用模型的朝向向量和目标方向向量计算旋转矩阵
        const rotationMatrix = new THREE.Matrix4().lookAt(modelDirection, targetDirection, new THREE.Vector3(0, 0, 1));

        // 将模型应用旋转矩阵
        model.setRotationFromMatrix(rotationMatrix);

        renderer.render(scene,camera);
        console.log(renderer);
        // camera.lookAt(-90, -215, 0);
        if (isAnimating) requestAnimationFrame(moveModel);
    }

    function destroyModel() {
        isAnimating = false;
        scene.remove(model);
        renderer.renderLists.dispose();
        console.log('destroyed');
    }

    moveModel();
}


function animateModel2(pathTime, model, modelMinTime) {
    let currentSegment = 0;
    let direction = new THREE.Vector3();
    let isAnimating = true;
    let partlyTime = modelMinTime;  // not correct, should be min of model's timestamp

    function moveModel() {
        if (!model || !isAnimating) return;
        console.log('move');

        partlyTime += 600;
        const currentTime = pathTime[currentSegment].w;
        const segmentStartTime = pathTime[currentSegment].w;
        const segmentEndTime = pathTime[currentSegment + 1].w;
        const segmentDuration = segmentEndTime - segmentStartTime;
        const elapsedTime = partlyTime - currentTime;

        const t = (currentTime - segmentStartTime) / segmentDuration;

        if (elapsedTime >= segmentEndTime) {
            currentSegment++;
            if (currentSegment >= pathTime.length - 1) {
                destroyModel();
                return;
            }
        }

        // lerp() is linear interpolation
        direction.copy(pathTime[currentSegment].clone().lerp(pathTime[currentSegment + 1], t).setComponent(3, 0));
        // console.log('fff');

        direction.sub(model.position).normalize();
        model.position.add(direction.multiplyScalar(0.2));

        // we need to change the direction the model is looking at

        const nextPosition = pathTime[currentSegment + 1];
        const modelDirection = nextPosition.clone().sub(model.position).normalize();

        // 使用模型的朝向向量创建一个目标方向向量（可以根据需要调整）
        const targetDirection = new THREE.Vector3(0, 1, 0); // 这里假设模型初始朝向是 z 轴正方向

        // 使用模型的朝向向量和目标方向向量计算旋转矩阵
        const rotationMatrix = new THREE.Matrix4().lookAt(modelDirection, targetDirection, new THREE.Vector3(0, 0, 1));

        // 将模型应用旋转矩阵
        model.setRotationFromMatrix(rotationMatrix);

        renderer.render(scene, camera);
        // camera.lookAt(-90, -215, 0);
        if (isAnimating) requestAnimationFrame(moveModel);
    }

    function destroyModel() {
        isAnimating = false;
        scene.remove(model);
        renderer.renderLists.dispose();
        console.log('destroyed');
    }

    moveModel();
}


function scene1Init() {
     // 获取要放置Three.js场景的容器
    var container = document.getElementById('3d');

    // 设置渲染器的尺寸为容器的尺寸
    var containerWidth = container.clientWidth +1100;
    var containerHeight = container.clientHeight +500;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);

    //scene = new THREE.Scene();
    //camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.set(200,100,350);  // test
    camera.position.set(-50, 10, 150);  // final look
    // camera.lookAt(1000,1000,100);

    scene.rotateX(-Math.PI/2);
        camera.updateProjectionMatrix();

   // 创建一个Three.js渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerWidth, containerHeight);

    // 将渲染器的dom元素添加到容器中
    container.appendChild(renderer.domElement);
    console.log(container)


    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(-90, -215, 0);
    // const loader = new GLTFLoader();

    const light = new THREE.AmbientLight(0x404040);
    light.position.set(20, 20, 20);
    // scene.add(light);

    // calibrate

    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const material2 = new THREE.MeshBasicMaterial( { color: 'blue' } );
    const cube1 = new THREE.Mesh( geometry, material );
    cube1.position.set(100, -155, 0);
    // scene.add( cube1 );

    const cube2 = new THREE.Mesh( geometry, material );
    cube2.position.set(94, -150, 0);
    // scene.add( cube2 );

    const cube3 = new THREE.Mesh( geometry, material );
    cube3.position.set(-10, -350, 0);
    // scene.add( cube3 );

    const cube4 = new THREE.Mesh( geometry, material );
    cube4.position.set(-20, -68, 0);
    // scene.add( cube4 );

    const cube5 = new THREE.Mesh( geometry, material );
    cube5.position.set(-33, -58, 0);
    // scene.add( cube5 );

    const cube6 = new THREE.Mesh( geometry, material );
    cube6.position.set(-40, -120, 0);
    // scene.add( cube6 );

    const cube7 = new THREE.Mesh( geometry, material );
    cube7.position.set(-43, -117, 0);
    // scene.add( cube7 );

    const cube8 = new THREE.Mesh( geometry, material );
    cube8.position.set(-55, -150, 0);
    // scene.add( cube8 );

    const cube9 = new THREE.Mesh( geometry, material );
    cube9.position.set(-60, -150, 0);
    // scene.add( cube9 );

    const cube10 = new THREE.Mesh( geometry, material );
    cube10.position.set(30, -140, 0);
    // scene.add( cube10 );

    const cube11 = new THREE.Mesh( geometry, material );
    cube11.position.set(-72, -150, 0);
    // scene.add( cube11 );

    const cube12 = new THREE.Mesh( geometry, material );
    cube12.position.set(-100, -35, 0);
    // scene.add( cube12 );

    const cube13 = new THREE.Mesh( geometry, material );
    cube13.position.set(40, -130, 0);
    // scene.add( cube13 );

    const stanCube1 = new THREE.Mesh( geometry, material2 );
    stanCube1.position.set(0, -350, 0);
    // scene.add( stanCube1 );

    const stanCube2 = new THREE.Mesh( geometry, material2 );
    stanCube2.position.set(50, -300, 0);
    // scene.add( stanCube2 );

    const stanCube3 = new THREE.Mesh( geometry, material2 );
    stanCube3.position.set(0, -300, 0);
    // scene.add( stanCube3 );

    const stanCube4 = new THREE.Mesh( geometry, material2 );
    stanCube4.position.set(50, -250, 0);
    // scene.add( stanCube4 );

    const stanCube5 = new THREE.Mesh( geometry, material2 );
    stanCube5.position.set(100, -200, 0);
    // scene.add( stanCube5 );

    const stanCube6 = new THREE.Mesh( geometry, material2 );
    stanCube6.position.set(100, -150, 0);
    // scene.add( stanCube6 );

    const stanCube7 = new THREE.Mesh( geometry, material2 );
    stanCube7.position.set(-100, 0, 0);
    // scene.add( stanCube7 );

    const stanCube8 = new THREE.Mesh( geometry, material2 );
    stanCube8.position.set(-50, -150, 0);
    // scene.add( stanCube8 );

    const stanCube9 = new THREE.Mesh( geometry, material2 );
    stanCube9.position.set(0, -150, 0);
    // scene.add( stanCube9 );

    //

    const axesHelper = new THREE.AxesHelper(200);
    // scene.add(axesHelper);


    const color = 0xFFFFFF;
    const intensity = 1;
    const light1 = new THREE.DirectionalLight(color, intensity);
    light1.position.set(0, 0, 30);
    light1.target.position.set(5, 5, 0);
    scene.add(light1);
    scene.add(light1.target);
    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(0, 0, 30);
    light2.target.position.set(-5, 5, 0);
    scene.add(light2);
    scene.add(light2.target);
    const light3 = new THREE.DirectionalLight(color, intensity);
    light3.position.set(0, 0, 30);
    light3.target.position.set(5, -5, 0);
    scene.add(light3);
    scene.add(light3.target);
    const light4 = new THREE.DirectionalLight(color, intensity);
    light4.position.set(0, 0, 30);
    light4.target.position.set(-5, -5, 0);
    scene.add(light4);
    scene.add(light4.target);

    const light5 = new THREE.DirectionalLight(color, intensity);
    light5.position.set(0, 0, 100);
    light5.target.position.set(-100, 100, 30);
    scene.add(light5);
    scene.add(light5.target);
    const light6 = new THREE.DirectionalLight(color, intensity);
    light6.position.set(0, 0, 100);
    light6.target.position.set(100, 100, 30);
    scene.add(light6);
    scene.add(light6.target);

    const callback = function (backgroundModel) {
        // 模型加载完成后的操作
        console.log('背景模型加载完成:', backgroundModel);
    };

    loadBackground(scene, callback);

    initializeModels1(scene1Data);

}


function scene2Init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.set(60,20,350);  // test1
    camera.position.set(30, 10, 350);

    scene.rotateX(-Math.PI/2);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(-90, -215, 0);
    // const loader = new GLTFLoader();

    const light = new THREE.AmbientLight(0x404040);
    light.position.set(20, 20, 20);
    // scene.add(light);

    // calibrate

    const color = 0xFFFFFF;
    const intensity = 1;
    const light1 = new THREE.DirectionalLight(color, intensity);
    light1.position.set(0, 0, 30);
    light1.target.position.set(5, 5, 0);
    scene.add(light1);
    scene.add(light1.target);
    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(0, 0, 30);
    light2.target.position.set(-5, 5, 0);
    scene.add(light2);
    scene.add(light2.target);
    const light3 = new THREE.DirectionalLight(color, intensity);
    light3.position.set(0, 0, 30);
    light3.target.position.set(5, -5, 0);
    scene.add(light3);
    scene.add(light3.target);
    const light4 = new THREE.DirectionalLight(color, intensity);
    light4.position.set(0, 0, 30);
    light4.target.position.set(-5, -5, 0);
    scene.add(light4);
    scene.add(light4.target);

    const light5 = new THREE.DirectionalLight(color, intensity);
    light5.position.set(0, 0, 100);
    light5.target.position.set(-100, 100, 30);
    scene.add(light5);
    scene.add(light5.target);
    const light6 = new THREE.DirectionalLight(color, intensity);
    light6.position.set(0, 0, 100);
    light6.target.position.set(100, 100, 30);
    scene.add(light6);
    scene.add(light6.target);

    const callback = function (backgroundModel) {
        // 模型加载完成后的操作
        console.log('背景模型加载完成:', backgroundModel);
    };

    loadBackground(scene, callback);

    initializeModels2(scene2Data);

}


// loadData();
scene1Init();
// scene2Init();
// initializeModels(testData1);
