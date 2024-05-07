import json
import datetime
import numpy as np
import pandas as pd


# 计算均速说明道路拥堵程度
# 车辆计数
road = pd.read_csv('car_juc.csv')
info_keys = ['id', 'is_moving', 'orientation', 'heading', 'velocity', 'time_meas', 'road_id', 'road_sec',
             'road_junction']
df = pd.DataFrame(road, columns=info_keys)  # Convert list to DataFrame
df = df[~df['road_id'].isin([0])]
df = df[~df['is_moving'].isin([0])]
# Convert 'time_meas' to datetime
df['datatime'] = pd.to_datetime(df['time_meas'] / 1000, unit='ms')
df['datatime'] = df['datatime'] + datetime.timedelta(hours=8)
df = df.sort_values(by='time_meas')  # Sort by 'time_meas'
df = df.drop_duplicates(subset=['id'], keep='first')  # 各区段车辆id去重后数据
# df['count']=df.groupby(['on_road', pd.Grouper(key='', freq='30Min')]).size()
# Group by 'on_road' and 'time_meas' at intervals of one hour and count elements in each group
print(df)
# df_grouped = df.groupby(['road_id', pd.Grouper(key='datatime', freq='1H')]).size().reset_index(name='count')
df['avg_vel'] = np.NaN
df_grouped = df.groupby(['road_id', pd.Grouper(key='datatime', freq='5Min')])


# 求路段所在路口
def get_on_road_value(row):
    road_id = row['road_id']
    if road_id in road['road_id'].values:
        a = road.loc[road['road_id'] == road_id, 'road_junction'].values[0]
        print(a)
        return road.loc[road['road_id'] == road_id, 'road_junction'].values[0]
    return None


df_grouped['junction'] = df_grouped.apply(get_on_road_value, axis=1)

# 求路段平均速度
jam_degree = []
for name, group in df_grouped:
    group['avg_vel'] = (group['velocity'].mean()) * 3.6
    print(group)
    jam_degree.append(group)

jam_degree_df = pd.concat(jam_degree)
jam_degree_df = jam_degree_df.drop_duplicates(subset='avg_vel')

# 保存文件
df_grouped.to_csv('traffic_static_in.csv', index=False)
jam_degree_df.to_csv("jam_degree.csv")
