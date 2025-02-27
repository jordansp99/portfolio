---
title: Introduction to Neural Networks with Python and Keras
date: 2025-02-27
category: Machine Learning, Python, Deep Learning
description: Learn the basics of neural networks and how to build a simple neural network using Python and Keras.
---

# Introduction to Neural Networks with Python and Keras

Neural networks are a powerful tool in machine learning, capable of solving complex problems such as image recognition, natural language processing, and more. In this post, we'll introduce the basics of neural networks and demonstrate how to build a simple neural network using Python and Keras, a high-level neural networks API.

## What are Neural Networks?

Neural networks are inspired by the structure and function of the human brain. They consist of interconnected nodes, or neurons, organized in layers. These layers include an input layer, one or more hidden layers, and an output layer. Each connection between neurons has a weight associated with it, which determines the strength of the connection.

![Neural Network Architecture](https://upload.wikimedia.org/wikipedia/commons/4/46/Colored_neural_network.svg)

## Setting up the Environment

First, make sure you have TensorFlow and Keras installed. If not, you can install them using pip:

```python
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# Generate dummy data
X = np.random.rand(100, 10)  # 100 samples, 10 features
y = np.random.randint(2, size=(100, 1))  # Binary classification

# Define the model
model = keras.Sequential([
    layers.Dense(16, activation='relu', input_shape=(10,)),
    layers.Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Display the model summary
model.summary()

# Train the model
model.fit(X, y, epochs=50, batch_size=32, verbose=1)

# Evaluate the model
loss, accuracy = model.evaluate(X, y)
print(f"Loss: {loss}, Accuracy: {accuracy}")
```