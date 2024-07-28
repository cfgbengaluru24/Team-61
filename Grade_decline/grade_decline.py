import pandas as pd
from scipy.stats import percentileofscore

file= open('grades.txt', 'r')
obj = file.read()
# print(obj
df = pd.read_json(obj)
df = df.transpose()
percentiles_df = pd.DataFrame(index=df.index, columns=df.columns)

# Calculate percentiles for each element in the DataFrame
for col in df.columns:
    for idx in df.index:
        value = df.at[idx, col]
        # Calculate the percentile of the value in its column
        percentile = percentileofscore(df[col], value, kind='rank')
        percentiles_df.at[idx, col] = percentile
def calculate_negative_rating(row):
    negative_rating = 0
    for i in range(1, len(row)):
        if row[i] < row[i-1]:  # Check if current value is less than the previous value
            negative_rating += row[i-1] - row[i]  # Add the difference to negative rating
        else:
            negative_rating = 0  # Reset the negative rating if no decline
    return negative_rating

# Apply the function to each row and store the result in the 'Negative Rating' column
percentiles_df['value'] = percentiles_df.apply(calculate_negative_rating, axis=1)
percentiles_df['value'] = (percentiles_df['value'] - percentiles_df['value'].min()) / (percentiles_df['value'].max() - percentiles_df['value'].min())

file= open('output.txt', 'r')
obj = file.read()
print(type(obj))
# print(dict(obj))
# df = pd.from_(obj)
# print(df)
