import pandas as pd

def split_dataframe(df: pd.DataFrame, row_count: int) -> list[pd.DataFrame]:
    """
    Port has trouble putting large tables in memory. 
    Has to be expected. Solution split tables into smaller tables.
    I have tried non-bespoke table soluions they did not perform any better

    I hope you have an idea to make tables faster! Would be nice
    """
    # Calculate the number of splits needed.
    num_splits = int(len(df) / row_count) + (len(df) % row_count > 0)

    # Split the DataFrame into chunks of size row_count.
    df_splits = [df[i*row_count:(i+1)*row_count].reset_index(drop=True) for i in range(num_splits)]

    return df_splits

