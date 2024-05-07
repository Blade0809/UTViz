import math
import pandas as pd
import datetime

# 车辆路径统计
road = pd.read_csv('car_juc.csv')
info_keys = ['id', 'is_moving', 'position', 'orientation', 'heading', 'velocity', 'time_meas', 'road_id', 'road_sec',
             'road_junction']
df = pd.DataFrame(road, columns=info_keys)  # Convert list to DataFrame
# Convert 'time_meas' to datetime
df['datatime'] = pd.to_datetime(df['time_meas'] / 1000, unit='ms')
df['datatime'] = df['datatime'] + datetime.timedelta(hours=8)
# df['time_meas']=df['time_meas']/1000
df = df.sort_values(by='time_meas')  # Sort by 'time_meas'
df_grouped = df.groupby(['id', pd.Grouper(key='datatime', freq='1H')])
print(df_grouped)

time_diff = []
id_values = []
prev_on_road = []
curr_on_road = []
prev = ""
curr = ""
junction_values = []
data_time = []
ore_values = []

for name, group in df_grouped:
    prev = group['road_id'].iloc[0]
    x = 0
    z = 0
    y = 0
    for i in range(len(group)):
        if i < len(group) - 1:
            curr = group['road_id'].iloc[i + 1]
            if curr == 0 and z == 0:
                y = i
                z += 1
                print(y)
            if group['road_id'].iloc[i] != curr and x != 1 and prev != 0 and curr != 0:
                x = x + 1
                time_diff.append(int(group['time_meas'].iloc[i + 1] - group['time_meas'].iloc[i]))
                id_values.append(group['id'].iloc[0])
                junction_values.append(group['road_junction'].iloc[0])
                data_time.append(group['datatime'].iloc[0])
                ore_values.append(math.degrees(group['orientation'].iloc[i + 1]))
                prev_on_road.append(group['road_id'].iloc[y])
                curr_on_road.append(curr)
print(prev)
result = pd.DataFrame(
    {'id': id_values, 'road_junction': junction_values, 'orientation': ore_values, 'datatime': data_time,
     'prev_on_road': prev_on_road, 'curr_on_road': curr_on_road, 'time_diff': time_diff})

trans = []
id_name = []
prev_road = []
result['out'] = result.groupby('prev_on_road').size()
print(result)
res = result.groupby('prev_on_road')
res_1 = []

for name, group in res:
    trans.append(group['time_diff'].max())
    group['time_mean'] = group['time_diff'].mean()
    group['time_max'] = group['time_diff'].max()
    res_1.append(group)

res_df = pd.concat(res_1)
res_df.to_csv('heading_count.csv')
print(res_df)
