---
title: Neural Network Models for Object Recognition
order: 2
description: Built and compared a NAS-optimized CNN and a transfer-learned Vision Transformer on CIFAR-10, improving test accuracy from 81.38% to 96.12%.
tags:
  - Computer Vision
  - CNN
  - Vision Transformer
  - Transfer Learning
  - Keras Tuner
imageUrl: https://picsum.photos/seed/object-recognition/800/400
---

# Neural Network Models for Object Recognition

This project explores how I built and optimized neural network models to identify objects in images, then compared a custom CNN against a transfer-learned Vision Transformer (ViT).  

The workflow and findings can be adapted to real-world applications such as:
- Vehicle identification in traffic footage
- Product sorting in warehouses
- Assistive object recognition for visually impaired users

## Dataset and Data Preparation

I used **CIFAR-10** (60,000 color images, 32x32 pixels, 10 classes).

To improve training stability and generalization:
- I normalized pixel values from `[0, 255]` to `[0, 1]`.
- I split the dataset into training, validation, and test sets:
- Training set: 40,000 images
- Validation set: 10,000 images
- Test set: 10,000 images

This split allowed architecture tuning without leaking test-set information, and the held-out test set provided an honest final estimate of real-world performance.

![CIFAR-10 examples by class](/projects/neural-network-object-recognition/cifar10-examples-by-class.png)

## Model 1: Custom CNN with Neural Architecture Search

For the first model, I built a CNN from scratch and used **Keras Tuner (Hyperband)** to automate architecture search.

Instead of training every candidate for all 50 epochs, Hyperband:
- Trained many candidates briefly
- Eliminated poor performers
- Allocated more epochs to stronger candidates

This tournament-style process focused compute on promising configurations and reduced manual trial-and-error.

### Search Space Highlights
- Activation: ReLU vs ELU
- Dropout rate (including high-regularization settings)
- Convolutional and dense layer configurations
- Data augmentation parameters

### Hyperparameter Search Space (Extracted Table)

| Hyperparameter | Search Range | Step/Sampling |
| --- | --- | --- |
| **Data Augmentation** |  |  |
| Rotation Factor | 0.0 - 0.2 | 0.05 |
| Zoom Factor | 0.0 - 0.2 | 0.05 |
| **Architecture** |  |  |
| Number of Conv Blocks | 2 - 4 | Integer |
| Filters (Block 0) | 32 - 128 | 32 |
| Filters (Block 1) | 64 - 256 | 32 |
| Filters (Block 2) | 128 - 512 | 32 |
| Filters (Block 3) | 256 - 1024 | 32 |
| Activation Function | ReLU, ELU | Categorical |
| Number of Dense Layers | 1 - 2 | Integer |
| Dense Units | 128 - 512 | 128 |
| Dropout Rate | 0.1 - 0.7 | 0.1 |
| **Training** |  |  |
| Learning Rate | 1e-5 - 1e-2 | Log scale |

## Data Augmentation Strategy

To reduce overfitting, I applied augmentation during training only:
- Random horizontal flips
- Random rotations
- Random zooms

This encouraged invariance to orientation and scale while keeping validation/test evaluation clean and unbiased.

![Data augmentation examples for automobile class](/projects/neural-network-object-recognition/data-augmentation-examples.png)

## NAS Outcomes and Selected CNN

The tuner evaluated dozens of candidate configurations. Most underperformed or showed unstable learning, while the top candidates converged well.

The winning architecture used:
- 3 convolutional blocks with ReLU
- Max-pooling after each convolution
- Filters: **128, 64, 416**
- Flatten + dense layer with **512 units**
- Dropout: **0.6**

Interestingly, the best augmentation combination selected by search was no rotation/zoom, relying primarily on horizontal flips.

I then trained this selected architecture for **50 epochs**.

![Hyperparameter performance comparison](/projects/neural-network-object-recognition/hyperparameter-performance-comparison.png)

![Selected CNN architecture](/projects/neural-network-object-recognition/cnn-architecture.png)

## Final CNN Training Behavior

During the full 50-epoch run:
- Training and validation curves tracked closely
- EarlyStopping (patience 10 on validation loss) was configured
- Training completed all 50 epochs because validation loss continued improving

This indicated good generalization with limited overfitting.

![CNN training and validation curves](/projects/neural-network-object-recognition/cnn-train-val-curves.png)

## CNN Error Analysis (Confusion Matrix)

The confusion matrix showed strong overall performance, but also clear weakness:
- Significant bidirectional confusion between **cats** and **dogs** (100+ mistakes in each direction)

This provided a concrete target for model improvement.

![CNN confusion matrix on CIFAR-10 test set](/projects/neural-network-object-recognition/cnn-confusion-matrix.png)

## CNN Summary Result

With the selected NAS architecture and 50-epoch training strategy:
- **Final test accuracy: 81.38%**

## Model 2: Vision Transformer (ViT) via Transfer Learning

For the second model, I switched from building from scratch to **transfer learning** using Google's pre-trained **Vision Transformer (ViT)**.

ViT was pre-trained on **ImageNet-21k** (14M+ images, 21k classes). It processes images as patches and models global relationships via self-attention.

### Transfer Learning Setup
1. **Frozen backbone**: Core ViT layers frozen as a fixed feature extractor  
2. **Trainable head**: Replaced and trained only the classification head on CIFAR-10

Data pipeline adjustments:
- Heavy augmentation (including random crops/flips)
- Upscaled CIFAR-10 images from 32x32 to 224x224
- Learning rate: `2e-5`

## ViT Training Behavior and Results

Transfer learning delivered a large performance jump:
- Validation accuracy exceeded 90% after the first epoch
- Peak validation accuracy exceeded 95%

Validation outperforming training was consistent with heavy augmentation applied during training only.

![ViT training and validation curves](/projects/neural-network-object-recognition/vit-train-val-curves.png)

## ViT Confusion Matrix Insights

The ViT confusion matrix showed much stronger class separation with minimal off-diagonal errors.

Most notably, the cat/dog weakness was substantially reduced:
- Dogs misclassified as cats dropped from **132** (CNN) to **44** (ViT)

![ViT confusion matrix on CIFAR-10 test set](/projects/neural-network-object-recognition/vit-confusion-matrix.png)

## Final ViT Result

After training the ViT head for 20 epochs:
- **Final test accuracy: 96.12%**

This is an improvement of nearly **15 percentage points** over the NAS-optimized CNN.

## Conclusion and Future Work

Key takeaway: transfer learning with a modern pre-trained architecture provided both higher accuracy and a much more efficient development path than full architecture search from scratch.

Potential next steps:
- Full fine-tuning (unfreeze additional pre-trained layers with low learning rate)
- Benchmarking against other strong pre-trained vision backbones
