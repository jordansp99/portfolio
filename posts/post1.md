---
title: Simple Data Analysis with Pandas - Exploring a Dataset
date: 2025-01-01
category: Data Science, Python
description: Learn how to perform basic data analysis using Pandas, a powerful Python library for data manipulation and analysis.
---

# Simple Data Analysis with Pandas

In this post, we'll walk through the process of performing basic data analysis using Pandas, a powerful Python library for data manipulation and analysis. We'll load a sample dataset and explore its contents.

## Setting up the Environment

First, make sure you have Pandas installed. If not, you can install it using pip:

```python
import pandas as pd

# Load the dataset (replace 'data.csv' with your dataset's file path)
try:
    df = pd.read_csv('data.csv')
except FileNotFoundError:
    print("Error: data.csv not found. Please ensure the file is in the correct directory.")
    exit()

# Display the first 5 rows of the DataFrame
print("First 5 rows of the DataFrame:")
print(df.head())

# Display basic information about the DataFrame
print("\nDataFrame Information:")
print(df.info())

# Display summary statistics of numerical columns
print("\nSummary Statistics:")
print(df.describe())

# Display the unique values of a categorical column (replace 'category_column' with your column name)
if 'category_column' in df.columns:
    print("\nUnique values in 'category_column':")
    print(df['category_column'].unique())
else:
    print("\nColumn 'category_column' not found. Please replace with an existing column name.")

# Example: calculate the mean of a numerical column (replace 'numerical_column' with your column name)
if 'numerical_column' in df.columns:
    mean_value = df['numerical_column'].mean()
    print(f"\nMean of 'numerical_column': {mean_value}")
else:
    print("\nColumn 'numerical_column' not found. Please replace with an existing column name.")

#Example: filter data based on a condition
if 'numerical_column' in df.columns:
    filtered_df = df[df['numerical_column'] > 50]
    print("\nFiltered data (numerical_column > 50):")
    print(filtered_df.head())
else:
    print("\nColumn 'numerical_column' not found. Please replace with an existing column name.")
```