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
imageUrl: /projects/neural-network-object-recognition/cifar10-examples-by-class.png
---

# Neural Network Models for Object Recognition

This project presents a comparative study of two computer vision approaches for object recognition on CIFAR-10: a custom convolutional neural network (CNN) optimized through Neural Architecture Search (NAS), and a transfer-learning pipeline based on a pre-trained Vision Transformer (ViT). The objective was to build a robust image classifier that generalizes well to unseen data, while evaluating the practical trade-offs between training from scratch and adapting a large pre-trained model. The resulting workflow is applicable to real-world scenarios such as vehicle recognition in traffic footage, product sorting in warehouses, and assistive object detection for visually impaired users.

## Dataset and Data Preparation

I used the CIFAR-10 dataset, which contains 60,000 color images of size 32x32 across 10 classes. To stabilize optimization and ensure features were on a comparable scale, pixel values were normalized from the original `[0, 255]` range to `[0, 1]`. The data was split into 40,000 training images, 10,000 validation images, and 10,000 test images. This separation made it possible to tune architecture and training decisions on validation data while preserving an untouched test set for final generalization assessment.

![CIFAR-10 examples by class](/projects/neural-network-object-recognition/cifar10-examples-by-class.png)

## Model 1: Custom CNN with Neural Architecture Search

For the first model, I built a custom CNN and optimized its design using Keras Tuner with the Hyperband algorithm. Rather than training every candidate architecture for the full schedule, Hyperband allocated resources progressively by training many candidates for short runs, eliminating weak performers, and extending training only for stronger models. This strategy significantly reduced computational waste and replaced manual trial-and-error with a structured search process.

### Search Space Highlights

The hyperparameter space covered activation functions (ReLU and ELU), convolutional depth and filter widths, dense layer depth and width, dropout strength, data augmentation ranges, and learning rate. This broad search space allowed the tuner to discover non-obvious but high-performing combinations.

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

To reduce overfitting and improve invariance, I applied on-the-fly augmentation during training only, including random horizontal flips, rotations, and zoom operations. Restricting augmentation to the training phase preserved validation and test sets as unbiased measurement points for model selection and final evaluation.

![Data augmentation examples for automobile class](/projects/neural-network-object-recognition/data-augmentation-examples.png)

## NAS Outcomes and Selected CNN

The tuner evaluated dozens of candidate configurations. Most trials either plateaued early or showed unstable validation behavior, while a smaller group converged reliably. The selected architecture used three convolutional blocks with max pooling, filter sizes of 128, 64, and 416, a 512-unit dense layer, and a dropout rate of 0.6. Notably, the best-performing setup minimized augmentation complexity by effectively relying on horizontal flips rather than heavier rotation and zoom settings. This final architecture was then trained for 50 epochs.

![Hyperparameter performance comparison](/projects/neural-network-object-recognition/hyperparameter-performance-comparison.png)

![Selected CNN architecture](/projects/neural-network-object-recognition/cnn-architecture.png)

## Final CNN Training Behavior

During full training, the training and validation curves tracked closely, indicating that the model was learning transferable patterns rather than memorizing the training set. Early stopping with a patience of 10 (monitoring validation loss) was enabled for regularization and model safety, but the stopping condition was not triggered because validation loss continued to improve through the full training horizon.

![CNN training and validation curves](/projects/neural-network-object-recognition/cnn-train-val-curves.png)

## CNN Error Analysis (Confusion Matrix)

The confusion matrix showed strong performance across most classes while revealing a clear and actionable weakness in cat-versus-dog discrimination, with substantial bidirectional confusion. This analysis provided a concrete target for architectural improvement in the next model iteration.

![CNN confusion matrix on CIFAR-10 test set](/projects/neural-network-object-recognition/cnn-confusion-matrix.png)

## CNN Summary Result

Using the NAS-selected architecture and the 50-epoch training strategy, the final CNN achieved a test accuracy of **81.38%**.

## Model 2: Vision Transformer (ViT) via Transfer Learning

For the second model, I shifted from training-from-scratch to transfer learning using Google's pre-trained Vision Transformer (ViT). Pre-trained on ImageNet-21k (more than 14 million images across 21,000 classes), ViT models long-range image context by converting images into patch tokens and applying self-attention across the full sequence.

### Transfer Learning Setup

I implemented a feature-extraction transfer-learning setup in two stages: first, the ViT backbone was frozen to preserve pre-trained representations; second, the original classification layer was replaced and only the new head was trained on CIFAR-10. The data pipeline included stronger augmentation (notably random crops and flips), and CIFAR-10 images were upscaled from 32x32 to 224x224 to match ViT input requirements. A conservative learning rate of `2e-5` was used for stable optimization of the new classifier head.

## ViT Training Behavior and Results

Transfer learning delivered an immediate and significant performance gain. Validation accuracy exceeded 90% after the first epoch and surpassed 95% at peak. Validation performance remained higher than training performance throughout most of the run, which is consistent with aggressive augmentation being applied during training but not during validation.

![ViT training and validation curves](/projects/neural-network-object-recognition/vit-train-val-curves.png)

## ViT Confusion Matrix Insights

The ViT confusion matrix showed stronger class separation and fewer off-diagonal errors overall. The previously dominant cat-dog failure mode was substantially reduced, with dogs misclassified as cats dropping from **132** in the CNN model to **44** in the ViT model.

![ViT confusion matrix on CIFAR-10 test set](/projects/neural-network-object-recognition/vit-confusion-matrix.png)

## Final ViT Result

After training the ViT classification head for 20 epochs, the final test accuracy reached **96.12%**, representing an improvement of nearly **15 percentage points** over the NAS-optimized CNN baseline.

## Conclusion and Future Work

The key outcome of this project is that transfer learning with a modern pre-trained architecture provided both substantially higher accuracy and a more efficient development path than full architecture discovery from scratch. In future iterations, performance could be pushed further by progressively unfreezing deeper ViT layers for low-learning-rate fine-tuning and benchmarking against alternative pre-trained vision backbones under a consistent evaluation protocol.
