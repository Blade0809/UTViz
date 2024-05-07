import jsonlines
from collections import Counter
import json
from shapely.geometry import shape, LineString, Polygon
import geopandas as gpd
import multiprocessing
import os

def data_clean(inx):
    """数据清洗，去除type=-1的json对象"""
    count = 0
    # 打开原始 JSON Lines 文件和一个新文件用于写入更新后的数据
    with jsonlines.open('dataRec/part-{}.json'.format(inx), 'r') as reader, jsonlines.open('updated_part_temp{}.json'.format(inx), 'w') as writer:
        # 遍历每一行数据
        for obj in reader:
            if obj['type'] == -1:
                # 跳过要删除的特定对象
                count+=1
                continue

            # 写入更新后的 JSON 对象到新文件
            writer.write(obj)
    print(count," rows affected.")
    #统计得到00000数据被删除了39073个数据，part_00001数据被删除了39064个

def data_consistency(inx):
    """数据一致性处理，找出fid相同但是type不同的数据，然后把他们处理为对应ID最多的type"""
    with jsonlines.open('updated_part_temp{}.json'.format(inx),'r') as reader:
        data = list(reader)
        type_id = {}
        count = 0
        for row in data:
            row_id = row['id']
            row_type = row['type']
            if row_id in type_id:
                type_id[row_id].append(row_type)
            else:
                type_id[row_id] = [row_type]
        # 遍历 JSON Lines 文件，将具有相同 ID 的条目的属性值更新为出现频率最多的属性值

        for obj in data:
            obj_id = obj['id']
            type_list = type_id[obj_id]
            most_common_attribute = Counter(type_list).most_common(1)[0][0]
            obj['type'] = most_common_attribute
        
    with jsonlines.open('updated_data_{}.json'.format(inx), 'w') as writer:
        writer.write_all(data)
    os.replace('updated_part_temp{}.json'.format(inx), 'updated_data_{}.json'.format(inx))

def road_sec_count():
    """查看总共有多少条路段"""
    data = gpd.read_file('road2-12-9road\laneroad_with9road.geojson')
    #只要路段road_sec_id 不等于零的部分
    #经过观察发现其实road_sec_id等于零要么是非机动车道，要么是道路转弯
    linestrings = data[(data['road_sec_id'] != 0)]
    road_sec = []
    for i in range(len(linestrings)):
        if linestrings['road_sec_id'].iloc[i] not in road_sec:
            road_sec.append(linestrings['road_sec_id'].iloc[i])
            #print(linestrings['road_sec_id'].iloc[i])
    print(road_sec)

    return road_sec


def data_intersects():
    # 读取 GeoJSON 文件
    data = gpd.read_file('dataRec/road2-12-9road/laneroad_with9road.geojson')
    
    #提取 LineString 几何对象及其 ID
    linestrings = data
    # linestrings = linestrings[linestrings['lane_no']!=0]
    # 存储重叠的 LineString 对象的 ID
    overlapping_ids = []
    linestrings['flag'] = 1
    # print(linestrings)
    # print("============================================")
    # 判断 LineString 之间是否有重叠
    # 同时，同处于一条路段也可以分类在一起
    for i in range(len(linestrings)):
        for j in range(i + 1, len(linestrings)):
            if ((linestrings['geometry'].iloc[i].intersects(linestrings['geometry'].iloc[j]) or (linestrings['road_sec_id'].iloc[i] == linestrings['road_sec_id'].iloc[j]))):
                overlapping_ids.append((linestrings['fid'].iloc[i], linestrings['fid'].iloc[j]))
                linestrings.iloc[i, linestrings.columns.get_loc('flag')] = 0
                linestrings.iloc[j, linestrings.columns.get_loc('flag')] = 0

    # print(linestrings)
    # 打印存在重叠的 LineString 对象的 ID
    # if len(overlapping_ids) > 0:
    #     print("LineString 之间存在重叠：")
    #     for ids in overlapping_ids:
    #         print("LineString ID:", ids[0], "和", "LineString ID:", ids[1])
    # else:
    #     print("LineString 之间没有重叠")
    road_set = list()
    flag = False
    for i in range(len(linestrings)):
        if linestrings['flag'].iloc[i]:
            road_set.append([linestrings['fid'].iloc[i]])
    for obj in overlapping_ids:
        if len(road_set)==0:
            road_set.append([obj[0],obj[1]])
        else:
            for yuansu in road_set:
                if (obj[0] in yuansu) or (obj[1] in yuansu):
                    if obj[1] not in yuansu:
                        yuansu.append(obj[1])
                    if obj[0] not in yuansu:
                        yuansu.append(obj[0])
                    flag = True
                    break
            if not flag:
                road_set.append([obj[0],obj[1]])
            flag = False
    for road in road_set:
        print(road)
    #road_set中的每一个列表表示一条道路，结果为25条道路，车道fid一致，如果把文中提到的车道汇合情况算作一条则一致
    print(len(road_set))

    return road_set
"""
下面是已经统计分割好的机动车道road_set
    [63]
    [64]
    [98]
    [99]
    [1558]
    [1559]
    [1994]
    [1995]
    [3486]
    [3487]
    [65, 1941, 1944, 1945, 1949, 1938, 1940, 1942, 1943, 1946, 1947, 1948, 1950, 1951, 1952, 1953, 1954]
    [101, 102, 106, 107, 111, 112, 116, 117, 163, 164, 120, 121]
    [103, 104, 105, 108, 109, 110, 113, 114, 115, 118, 119, 165, 166, 122, 123]
    [120, 121, 124, 125, 126, 129, 130, 131, 134, 135, 136]
    [122, 123, 127, 128, 132, 133, 137, 138]
    [139, 140]
    [155, 156, 157]
    [200, 201, 202, 1688, 1689, 1690]
    [203, 204, 1691, 1692, 4938, 1693]
    [205, 206, 210, 211, 212, 216, 217, 218]
    [207, 208, 209, 213, 214, 215, 219, 220]
    [221, 222, 226, 227, 228, 232, 233, 234]
    [223, 224, 225, 229, 230, 231, 235, 236]
    [237, 238, 242, 243, 244, 248, 249, 250]
    [239, 240, 241, 245, 246, 247, 251, 252]
    [253, 254, 258, 259, 260, 264, 265, 266]
    [255, 256, 257, 261, 262, 263, 267, 268]
    [1001, 1004, 70358, 1007, 70359, 1010, 70360, 1012, 1013, 70361, 1016, 70362, 1017, 70363]
    [1002, 1003, 1005, 70369, 1006, 1008, 70368, 1009, 1011, 70367, 1014, 1015, 70366, 1018, 70365, 1019, 70364]
    [1020, 1021, 70370]
    [1037, 1038, 1039, 1040, 70381, 1041, 1042, 70382]
    [1442, 1443, 1444, 1445, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933]
    [1446, 1447, 1448, 1449, 1450, 1921, 1922, 1923, 1924, 1925]
    [1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463]
    [1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475, 1476]
    [1477, 1478, 1479, 3128, 3129, 3130]
    [1480, 1481, 1482, 3131, 3132, 3133, 3134, 3135, 3136]
    [1483, 1484, 1485, 3105, 3106]
    [1486, 1487, 1488, 1489, 3124, 3125, 3126, 3127]
    [1490, 1491, 1492, 1493]
    [1548, 1549, 1550, 1551, 1552, 1553, 1554, 1555, 1556, 1557]
    [1879, 1880, 1881, 80562, 80563, 80564, 70352, 80565, 80566]
    [1882, 1883, 1884, 80557, 80558, 80559, 70351, 80560, 80561]
    [1895, 1896, 70350, 80560, 80561, 70351]
    [1898, 1899, 1900, 1901, 1902, 80569, 1903, 1904, 80568, 1905, 80567, 1906, 1907, 1908, 1909]
    [1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 80570, 80571, 80572, 80573]
    [1934, 1935, 1936, 1937, 80692, 1938, 80693, 1939, 80694, 1940, 1942]
    [1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 80691, 80690, 80689, 80688]
    [1972, 1973, 1974]
    [1975, 1976, 1977, 1978, 5185, 5186, 5187, 5188]
    [3137, 3138, 3139, 3140, 70412, 80682, 3141, 80683, 3142, 80684, 70413, 70411]
    [3143, 3144, 3145, 3146, 70414, 3147, 3148, 70415, 80681, 80680, 80679, 70416]
    [4942, 4943, 70353, 80565, 80566, 70352]
"""


def statistics(inx):
    """
    这个函数是处理车辆数据，只保留了还在运动的车辆，同时去除了道路中的行人和其他非机动车交通参与者
    """
    with jsonlines.open('updated_data_{}.json'.format(inx),'r') as reader:
        with jsonlines.open("final_part_0000{}.json".format(inx), mode='w') as writer:
            for json_obj in reader:
                center_point = json_obj['position']
                center_point = json.loads(center_point)
                shape_data = json_obj['shape']
                shape_data = json.loads(shape_data)
                rec_coords = []
                x1 = center_point['x']-0.5*shape_data['x']
                x4 = x1
                x2 = center_point['x']+0.5*shape_data['x']
                x3 = x2
                y1 = center_point['y']+0.5*shape_data['y']
                y2 = y1
                y4 = center_point['y']-0.5*shape_data['y']
                y3 = y4
                rec_coords.append((x1,y1))
                rec_coords.append((x2,y2))
                rec_coords.append((x3,y3))
                rec_coords.append((x4,y4))
                is_moving = json_obj['is_moving']
                type = json_obj['type']
                velocity=json_obj['velocity']
                if is_moving and (type in [1, 2, 3, 4, 5, 6, 10]):
                    new_json_obj = {
                        "id":json_obj['id'],
                        "type":type,
                        "time_meas":json_obj['time_meas'],
                        "coords": rec_coords,
                        "velocity":velocity,
                        "on_road":0
                    }
                    writer.write(new_json_obj)

def timemeas_change(inx):
    """将十六位时间戳转换成十位时间戳，并按照时间戳大小排序"""
    with jsonlines.open("final_part_0000{}.json".format(inx),'r') as reader:
        data = [line for line in reader]
        # 提取每个 JSON 对象中名为 "timemeas" 的时间戳，并在每个对象中增加一个 "_timestamp" 键来保存时间戳的值
    for obj in data:
        timemeas_timestamp = obj.get("time_meas", None)
        if timemeas_timestamp:
            time_meas = int(timemeas_timestamp/1000)
            obj["_timestamp"] = time_meas
            obj['time_meas'] = time_meas
        # 使用 "timemeas" 时间戳的值对 JSON 对象进行排序
    sorted_data = sorted(data, key=lambda x: x.get("_timestamp", 0))
    # 移除中间增加的 "_timestamp" 键
    for obj in sorted_data:
        obj.pop("_timestamp", None)
    
    # 可选：将排序后的 JSON 对象写回 JSON Lines 文件
    with open('final_part_0000{}.json'.format(inx), 'w', encoding='utf-8') as file:
        for obj in sorted_data:
            json.dump(obj, file)
            file.write('\n')
    
def transition(inx):
    """给文件添加上road_sec这个属性，用于判断对象在什么路段上"""
    with jsonlines.open("final_part_0000{}.json".format(inx),'r') as reader:
        with jsonlines.open('data_temp{}.jsonl'.format(inx), 'w') as writer:
            for obj in reader:
                # 为每个对象添加新属性
                obj['road_sec'] = 0  # 你可以根据需要修改新属性的值
                # 将更改后的对象写入暂存文件中
                writer.write(obj)
    #移除原文件
    os.remove("final_part_0000{}.json".format(inx))

    # 重命名暂存文件为原始文件名
    os.rename('data_temp{}.jsonl'.format(inx), "final_part_0000{}.json".format(inx))

def total_flow(road_set, inx):
    """判断各个车在什么道路上"""
    with jsonlines.open('final_part_0000{}.json'.format(inx),'r') as reader, jsonlines.open('final1_part_0000{}.json'.format(inx), mode='w') as writer:
        gdf = gpd.read_file('road2-12-9road/laneroad_with9road.geojson')
        #统计数据量初始化
        road_count={}
        count_id = 1
        road_geo = {}
        linestrings = []
        for road in road_set:
            for road_id in road:
                #提前准备好路线的地理数据
                geo = gdf[gdf['fid']== road_id]
                target_geometry = geo.iloc[0].geometry
                linestrings.append(target_geometry)
            merged_linstrings = linestrings[0]
            for linestring in linestrings[1:]:
                merged_linstrings = merged_linstrings.union(linestring)
            road_count[count_id] = 0
            road_geo[count_id] = merged_linstrings
            count_id += 1

        for car_obj in reader:
            
            rectangle_coords = car_obj['coords']
            on_road = car_obj['on_road']
            # 将长方形的四个顶点坐标转换为 Shapely 的 Polygon 对象
            rectangle = Polygon(rectangle_coords)
            flag = False
            count_id = 1
            for road in road_set:
                if on_road != count_id:
                    target_geometry = road_geo[count_id]
                    # 判断指定 id 的 LineString 对象是否与长方形有重叠
                    overlap = target_geometry.intersects(rectangle)
                    if overlap:
                        #如果重叠，那么就直接终止所有的循环，开始到下一个car_obj
                        flag = True
                        car_obj['on_road'] = count_id
                        writer.write(car_obj)
                        break
                count_id += 1
                if flag:
                    break
    os.replace('final1_part_0000{}.json'.format(inx), 'final_part_0000{}.json'.format(inx))

def set_road_sec(road_set):
    """根据所处的到路然后判断它现在所处的路段"""
    gdf = gpd.read_file('road2-12-9road/laneroad_with9road.geojson')
    #统计数据量初始化
    count_id = 1
    road_sec = {}
    for road in road_set:
        for road_id in road:
            #提前准备好路线的地理数据
            geo = gdf[gdf['fid']== road_id]
            road_sec_id = geo.iloc[0].road_sec_id
            road_sec[count_id] = road_sec_id
        count_id+= 1
    # print(road_sec)
    # print("==================")
    # print(count_id)
    """给文件添加上road_sec这个属性，用于判断对象在什么路段上"""
    with jsonlines.open('the_last.json','r') as reader:
        with jsonlines.open('data_temp.jsonl', 'w') as writer:
            for obj in reader:
                index = obj['on_road']
                # 为每个对象添加新属性
                obj['road_sec'] = int(road_sec[index])  # 你可以根据需要修改新属性的值
                # 将更改后的对象写入暂存文件中
                writer.write(obj)

def timemeas_sort():
    """将十六位时间戳转换成十位时间戳，并按照时间戳大小排序"""
    with jsonlines.open("data_temp.jsonl",'r') as reader:
        data = [line for line in reader]
        # 提取每个 JSON 对象中名为 "timemeas" 的时间戳，并在每个对象中增加一个 "_timestamp" 键来保存时间戳的值
    for obj in data:
        timemeas_timestamp = obj.get("time_meas", None)
        if timemeas_timestamp:
            obj["_timestamp"] = obj['time_meas'] 
        # 使用 "timemeas" 时间戳的值对 JSON 对象进行排序
    sorted_data = sorted(data, key=lambda x: x.get("_timestamp", 0))
    # 移除中间增加的 "_timestamp" 键
    for obj in sorted_data:
        obj.pop("_timestamp", None)
    
    # 可选：将排序后的 JSON 对象写回 JSON Lines 文件
    with open("data_temp.jsonl", 'w', encoding='utf-8') as file:
        for obj in sorted_data:
            json.dump(obj, file)
            file.write('\n')
    

def total_flow_statistics():
    """统计每一条道路在不同时段中的流量，最后输出结果是一个dataframe，列代表车道编号从1~32，
    行代表时间从0~23，但是不是0点到23点，还没有处理成真实世界的时间"""
    with jsonlines.open('data_temp_else.json','r') as reader:
        time_stage = {}
        road_count = {}
        road_fid = {}
        for i in range(1,54):
            road_count[i] = 0
        for i in range(0,24):
            time_stage[i] = {}
            for j in range(1,54):
               time_stage[i][j] = 0
        for car_obj in reader:
            on_road = car_obj['on_road']
            fid = car_obj['id']
            timemeas = car_obj['time_meas']
            clock = int((timemeas-1681315197699)/3600000)
            if fid not in road_fid:
                road_fid[fid] = on_road
                time_stage[clock][on_road] += 1
            else:
                if road_fid[fid] == on_road:
                    continue
                else:
                    road_fid[fid] = on_road
                    time_stage[clock][on_road] += 1
        import pandas as pd
        df = pd.DataFrame.from_dict(time_stage, orient='index')
        print(df)
        df.to_csv('data.csv', index=False)
    return df


def total_flow_statistics_quater():
    """和total_flow_statistics一样也是统计时段内的流量，但是精度换成了15分钟为一段时间"""
    with jsonlines.open('updated_part_temp.json','r') as reader:
        time_stage = {}
        road_count = {}
        road_fid = {}
        for i in range(1,33):
            road_count[i] = 0
        for i in range(0,24*4):
            time_stage[i] = {}
            for j in range(1,33):
               time_stage[i][j] = 0
        for car_obj in reader:
            on_road = car_obj['on_road']
            fid = car_obj['id']
            timemeas = car_obj['time_meas']
            clock = int((timemeas-1681315197699)/900000)
            if fid not in road_fid:
                road_fid[fid] = on_road
                time_stage[clock][on_road] += 1
            else:
                if road_fid[fid] == on_road:
                    continue
                else:
                    road_fid[fid] = on_road
                    time_stage[clock][on_road] += 1
        import pandas as pd
        df = pd.DataFrame.from_dict(time_stage, orient='index')
        print(df)
        df.to_csv('data_quater.csv', index=False)
    return df

def delete_same():
    """删除文件中重复的对象"""
    import hashlib

    # 输入文件名和输出文件名
    input_file = 'data_temp.jsonl'
    output_file = 'data_temp_else.json'

    # 用于存储已读取的JSON对象的哈希值
    hash_set = set()

    # 打开输入文件和输出文件
    with jsonlines.open(input_file, 'r') as f_in, jsonlines.open(output_file, 'w') as f_out:
        # 逐行读取JSON对象
        for json_obj in f_in:
            # 计算JSON对象的哈希值
            json_str = json.dumps(json_obj, sort_keys=True)
            hash_value = hashlib.md5(json_str.encode('utf-8')).hexdigest()
            
            # 如果哈希值不在集合中，说明是新的JSON对象，将其写入输出文件，并添加到集合中
            if hash_value not in hash_set:
                f_out.write(json_obj)
                hash_set.add(hash_value)

    # 关闭文件
    f_in.close()
    f_out.close()

def concentrator(roads, inx):
    """
    简单把过程汇总一下
    """
    data_clean(inx)
    data_consistency(inx)
    statistics(inx)
    total_flow(roads, inx)


#total_flow_statistics()
if __name__ == "__main__":

    #roads是有多少条路
    roads = data_intersects()
    #road_sec是有多少条路段
    raod_sec = road_sec_count()

    # 创建五条线程来并行执行代码，这个主要还是看电脑支持多少条线程吧，自己设置一下
    for i in range(0,2):
        processes = []
        index = i*5
        for j in range(index, index+5):
            process = multiprocessing.Process(target=transition, args=(j,))
            processes.append(process)

        # 启动这五个进程
        for process in processes:
            process.start()

        # 等待所有进程完成
        for process in processes:
            process.join()

    print("All processes have finished.")
    #做这个时候应该先把所有处理好的数据全部存在timemeas_change的那个输入文件地址里面
    timemeas_change()
    set_road_sec(roads)
    delete_same()
    total_flow_statistics()