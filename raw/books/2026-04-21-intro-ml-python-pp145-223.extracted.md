# Unsupervised Learning and Preprocessing

The second family of machine learning algorithms that we will discuss is unsuper‐ vised learning algorithms. Unsupervised learning subsumes all kinds of machine learning where there is no known output, no teacher to instruct the learning algo‐ rithm. In unsupervised learning, the learning algorithm is just shown the input data and asked to extract knowledge from this data.

# Types of Unsupervised Learning

We will look into two kinds of unsupervised learning in this chapter: transformations of the dataset and clustering.

Unsupervised transformations of a dataset are algorithms that create a new representa‐ tion of the data which might be easier for humans or other machine learning algo‐ rithms to understand compared to the original representation of the data. A common application of unsupervised transformations is dimensionality reduction, which takes a high-dimensional representation of the data, consisting of many features, and finds a new way to represent this data that summarizes the essential characteristics with fewer features. A common application for dimensionality reduction is reduction to two dimensions for visualization purposes.

Another application for unsupervised transformations is finding the parts or compo‐ nents that “make up” the data. An example of this is topic extraction on collections of text documents. Here, the task is to find the unknown topics that are talked about in each document, and to learn what topics appear in each document. This can be useful for tracking the discussion of themes like elections, gun control, or pop stars on social media.

Clustering algorithms, on the other hand, partition data into distinct groups of similar items. Consider the example of uploading photos to a social media site. To allow you

to organize your pictures, the site might want to group together pictures that show the same person. However, the site doesn’t know which pictures show whom, and it doesn’t know how many different people appear in your photo collection. A sensible approach would be to extract all the faces and divide them into groups of faces that look similar. Hopefully, these correspond to the same person, and the images can be grouped together for you.

# Challenges in Unsupervised Learning

A major challenge in unsupervised learning is evaluating whether the algorithm learned something useful. Unsupervised learning algorithms are usually applied to data that does not contain any label information, so we don’t know what the right output should be. Therefore, it is very hard to say whether a model “did well.” For example, our hypothetical clustering algorithm could have grouped together all the pictures that show faces in profile and all the full-face pictures. This would certainly be a possible way to divide a collection of pictures of people’s faces, but it’s not the one we were looking for. However, there is no way for us to “tell” the algorithm what we are looking for, and often the only way to evaluate the result of an unsupervised algo‐ rithm is to inspect it manually.

As a consequence, unsupervised algorithms are used often in an exploratory setting, when a data scientist wants to understand the data better, rather than as part of a larger automatic system. Another common application for unsupervised algorithms is as a preprocessing step for supervised algorithms. Learning a new representation of the data can sometimes improve the accuracy of supervised algorithms, or can lead to reduced memory and time consumption.

Before we start with “real” unsupervised algorithms, we will briefly discuss some sim‐ ple preprocessing methods that often come in handy. Even though preprocessing and scaling are often used in tandem with supervised learning algorithms, scaling meth‐ ods don’t make use of the supervised information, making them unsupervised.

# Preprocessing and Scaling

In the previous chapter we saw that some algorithms, like neural networks and SVMs, are very sensitive to the scaling of the data. Therefore, a common practice is to adjust the features so that the data representation is more suitable for these algorithms. Often, this is a simple per-feature rescaling and shift of the data. The following code (Figure 3-1) shows a simple example:

# In[2]:

mglearn.plots.plot_scaling()

![](_attachments/intro-ml-python-pp145-223/c501d41880db3b8aabb3f2805e759bbc996e39c87f82870c6ba527f501191749.jpg)

![](_attachments/intro-ml-python-pp145-223/7904bd020ca4cf2ad8a3a429c7f807a9dffbf4b47cfea6e8e0bb75a413549237.jpg)

![](_attachments/intro-ml-python-pp145-223/6445e4488ebd19672c0db0c164fe54bf8412d335a1fe69ff0b79bb7d61c5ce0f.jpg)

![](_attachments/intro-ml-python-pp145-223/e83ff205066bfe3b0a287af6bd9d898a69e1cfce376761f8f0d9e77242f35d20.jpg)

![](_attachments/intro-ml-python-pp145-223/e8596997171fcbf0300a34b3bf7d5874a40e972f1ef75ba7d5c3d292074982c0.jpg)  
Figure 3-1. Different ways to rescale and preprocess a dataset

# Different Kinds of Preprocessing

The first plot in Figure 3-1 shows a synthetic two-class classification dataset with two features. The first feature (the x-axis value) is between 10 and 15. The second feature (the y-axis value) is between around 1 and 9.

The following four plots show four different ways to transform the data that yield more standard ranges. The StandardScaler in scikit-learn ensures that for each feature the mean is 0 and the variance is 1, bringing all features to the same magni‐ tude. However, this scaling does not ensure any particular minimum and maximum values for the features. The RobustScaler works similarly to the StandardScaler in that it ensures statistical properties for each feature that guarantee that they are on the same scale. However, the RobustScaler uses the median and quartiles,1 instead of mean and variance. This makes the RobustScaler ignore data points that are very different from the rest (like measurement errors). These odd data points are also called outliers, and can lead to trouble for other scaling techniques.

The MinMaxScaler, on the other hand, shifts the data such that all features are exactly between 0 and 1. For the two-dimensional dataset this means all of the data is con‐

tained within the rectangle created by the x-axis between 0 and 1 and the y-axis between 0 and 1.

Finally, the Normalizer does a very different kind of rescaling. It scales each data point such that the feature vector has a Euclidean length of 1. In other words, it projects a data point on the circle (or sphere, in the case of higher dimensions) with a radius of 1. This means every data point is scaled by a different number (by the inverse of its length). This normalization is often used when only the direction (or angle) of the data matters, not the length of the feature vector.

# Applying Data Transformations

Now that we’ve seen what the different kinds of transformations do, let’s apply them using scikit-learn. We will use the cancer dataset that we saw in Chapter 2. Pre‐ processing methods like the scalers are usually applied before applying a supervised machine learning algorithm. As an example, say we want to apply the kernel SVM (SVC) to the cancer dataset, and use MinMaxScaler for preprocessing the data. We start by loading our dataset and splitting it into a training set and a test set (we need separate training and test sets to evaluate the supervised model we will build after the preprocessing):

# In[3]:

from sklearn.datasets import load_breast_cancer   
from sklearn.model_selection import train_test_split   
cancer $=$ load_breast_cancer()   
X_train，X_test，y_train，y_test $=$ train_test_split(cancer.data，cancer.target, random_state $\equiv 1$ print(X_train.shape)   
print(X_test.shape)

# Out[3]:

```javascript
(426,30) (143,30) 
```

As a reminder, the dataset contains 569 data points, each represented by 30 measure‐ ments. We split the dataset into 426 samples for the training set and 143 samples for the test set.

As with the supervised models we built earlier, we first import the class that imple‐ ments the preprocessing, and then instantiate it:

# In[4]:

```python
from sklearn.preprocessing import MinMaxScaler  
scalar = MinMaxScaler() 
```

We then fit the scaler using the fit method, applied to the training data. For the Min MaxScaler, the fit method computes the minimum and maximum value of each fea‐ ture on the training set. In contrast to the classifiers and regressors of Chapter 2, the scaler is only provided with the data (X_train) when fit is called, and y_train is not used:

# In[5]:

```txt
scalar.fit(X_train) 
```

# Out[5]:

```autoit
MinMaxScaler.copy=True, feature_range=(0,1)) 
```

To apply the transformation that we just learned—that is, to actually scale the training data—we use the transform method of the scaler. The transform method is used in scikit-learn whenever a model returns a new representation of the data:

# In[6]:

```python
# transform data
X_trainScaled =Scaler.transform(X_train)
# print dataset properties before and after scaling
print("transformed shape:{}".format(X_trainScaled.shape))
print("per-feature minimum before scaling:\n{}".format(X_train.min(axis=0))
print("per-feature maximum before scaling:\n{}".format(X_train.max(axis=0))
print("per-feature minimum after scaling:\n{}".format(X_train.min(axis=0)))
print("per-feature maximum after scaling:\n{}".format(X_train.max(axis=0))) 
```

# Out[6]:

```txt
transformed shape: (426, 30)  
per-feature minimum before scaling:  
[ 6.98 9.71 43.79 143.50 0.05 0.02 0. 0. 0.11  
0.05 0.12 0.36 0.76 6.80 0. 0. 0. 0.  
0.01 0. 7.93 12.02 50.41 185.20 0.07 0.03 0.  
0. 0.16 0.06]  
per-feature maximum before scaling:  
[ 28.11 39.28 188.5 2501.0 0.16 0.29 0.43 0.2  
0.300 0.100 2.87 4.88 21.98 542.20 0.03 0.14  
0.400 0.050 0.06 0.03 36.04 49.54 251.20 4254.00  
0.220 0.940 1.17 0.29 0.58 0.15]  
per-feature minimum after scaling:  
[ 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.  
0. 0. 0. 0. 0. 0. 0. 0. 0. 0. 0.]  
per-feature maximum after scaling:  
[ 1. 1. 1. 1. 1. 1. 1. 1. 1. 1. 1. 1. 1. 1. 
```

The transformed data has the same shape as the original data—the features are simply shifted and scaled. You can see that all of the features are now between 0 and 1, as desired.

To apply the SVM to the scaled data, we also need to transform the test set. This is again done by calling the transform method, this time on X_test:

In[7]:   
```python
# transform test data
X_testScaled =Scaler.transform(X_test)
# print test data properties after scaling
print("per-feature minimum after scaling:\n").format(X_testScaled.min(axis=0))
print("per-feature maximum after scaling:\n").format(X_testScaled.max(axis=0)) 
```

Out[7]:   
```latex
per-feature minimum after scaling:  
[ \begin{bmatrix} 0.034 & 0.023 & 0.031 & 0.011 & 0.141 & 0.044 & 0. & 0. & 0.154 & -0.006 \\ -0.001 & 0.006 & 0.004 & 0.001 & 0.039 & 0.011 & 0. & 0. & -0.032 & 0.007 \\ 0.027 & 0.058 & 0.02 & 0.009 & 0.109 & 0.026 & 0. & 0. & -0. & -0.002 \end{bmatrix} ]  
per-feature maximum after scaling:  
[ \begin{bmatrix} 0.958 & 0.815 & 0.956 & 0.894 & 0.811 & 1.22 & 0.88 & 0.933 & 0.932 & 1.037 \\ 0.427 & 0.498 & 0.441 & 0.284 & 0.487 & 0.739 & 0.767 & 0.629 & 1.337 & 0.391 \\ 0.896 & 0.793 & 0.849 & 0.745 & 0.915 & 1.132 & 1.07 & 0.924 & 1.205 & 1.631 \end{bmatrix} ] 
```

Maybe somewhat surprisingly, you can see that for the test set, after scaling, the mini‐ mum and maximum are not 0 and 1. Some of the features are even outside the 0–1 range! The explanation is that the MinMaxScaler (and all the other scalers) always applies exactly the same transformation to the training and the test set. This means the transform method always subtracts the training set minimum and divides by the training set range, which might be different from the minimum and range for the test set.

# Scaling Training and Test Data the Same Way

It is important to apply exactly the same transformation to the training set and the test set for the supervised model to work on the test set. The following example (Figure 3-2) illustrates what would happen if we were to use the minimum and range of the test set instead:

In[8]:   
from sklearn.datasets import makeblobs   
#make synthetic data   
X， $\equiv$ makeblobs(n_samples $= 50$ ，centers $= 5$ ，random_state $= 4$ ，cluster_std $= 2$ #split it into training and test sets   
X_train，X_test $\equiv$ train_test_split(X，random_state $= 5$ ，test_size $= .1$ #plot the training and test sets   
fig，axes $\equiv$ plt.subplot(1,3，figsize=(13，4))

```python
axes[0].scatter(X_train[:, 0], X_train[:, 1], c=mglearn.cm2(0), label="Training set", s=60)  
axes[0].scatter(X_test[:, 0], X_test[:, 1], marker='^', c=mglearn.cm2(1), label="Test set", s=60)  
axes[0].legend(loc='upper left')  
axes[0].set_title("Original Data")  
# scale the data using MinMaxScaler  
scalar = MinMaxScaler()  
scalar.fit(X_train)  
X_trainScaled = scalar.transform(X_train)  
X_testScaled = scalar.transform(X_test)  
# visualize the properly scaled data  
axes[1].scatter(X_trainScaled[:, 0], X_trainScaled[:, 1], c=mglearn.cm2(0), label="Training set", s=60)  
axes[1].scatter(X_testScaled[:, 0], X_testScaled[:, 1], marker='^', c=mglearn.cm2(1), label="Test set", s=60)  
axes[1].set_title("Scaled Data")  
# rescale the test set separately  
# so test set min is 0 and test set max is 1  
# DO NOT DO THIS! For illustration purposes only.  
testScaler = MinMaxScaler()  
testScaler.fit(X_test)  
X_testScaled_badly = testScaler.transform(X_test)  
# visualize wrongly scaled data  
axes[2].scatter(X_trainScaled[:, 0], X_trainScaled[:, 1], c=mglearn.cm2(0), label="training set", s=60)  
axes[2].scatter(X_testScaled_badly[:, 0], X_testScaled_badly[:, 1], marker='^', c=mglearn.cm2(1), label="test set", s=60)  
axes[2].set_title("Improperly Scaled Data")  
for ax in axes:  
    ax.set_xlabel("Feature 0")  
    ax.set_ylabel("Feature 1") 
```

![](_attachments/intro-ml-python-pp145-223/e1446e65b7cd76878d6c53a54d2458bb3f0a133b609c216d753ae04713b55288.jpg)

![](_attachments/intro-ml-python-pp145-223/4427eb53f2d970c59dec136582339faa19ea6a463044fbf5999f538f71bc5a8e.jpg)

![](_attachments/intro-ml-python-pp145-223/08b753b2cafbfb9d349522f16f05cea1dc5eec68449a68a7ba1fb45f517e58bd.jpg)  
Figure 3-2. Effect of scaling training and test data shown on the left together (center) and separately (right)

The first panel is an unscaled two-dimensional dataset, with the training set shown as circles and the test set shown as triangles. The second panel is the same data, but scaled using the MinMaxScaler. Here, we called fit on the training set, and then called transform on the training and test sets. You can see that the dataset in the sec‐ ond panel looks identical to the first; only the ticks on the axes have changed. Now all the features are between 0 and 1. You can also see that the minimum and maximum feature values for the test data (the triangles) are not 0 and 1.

The third panel shows what would happen if we scaled the training set and test set separately. In this case, the minimum and maximum feature values for both the train‐ ing and the test set are 0 and 1. But now the dataset looks different. The test points moved incongruously to the training set, as they were scaled differently. We changed the arrangement of the data in an arbitrary way. Clearly this is not what we want to do.

As another way to think about this, imagine your test set is a single point. There is no way to scale a single point correctly, to fulfill the minimum and maximum require‐ ments of the MinMaxScaler. But the size of your test set should not change your processing.

# Shortcuts and Efficient Alternatives

Often, you want to fit a model on some dataset, and then transform it. This is a very common task, which can often be computed more efficiently than by simply calling fit and then transform. For this use case, all models that have a transform method also have a fit_transform method. Here is an example using StandardScaler:

# In[9]:

from sklearn.preprocessing import StandardScaler   
scalar $=$ StandardScaler() # calling fit and transform in sequence (using method chaining) XScaled $\equiv$ scalar.fit(X).transform(X) # same result, but more efficient computation XScaled_d $\equiv$ scalar.fit_transform(X)

While fit_transform is not necessarily more efficient for all models, it is still good practice to use this method when trying to transform the training set.

# The Effect of Preprocessing on Supervised Learning

Now let’s go back to the cancer dataset and see the effect of using the MinMaxScaler on learning the SVC (this is a different way of doing the same scaling we did in Chap‐ ter 2). First, let’s fit the SVC on the original data again for comparison:

In[10]:   
from sklearn谣 import SVC   
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state $\equiv$ 0)   
svm $=$ SVC(C=100)   
svm.fit(X_train, y_train)   
print("Test set accuracy: $\{\therefore 2f\}$ .format(svm.score(X_test,y_test)))

Out[10]:   
```txt
Test set accuracy: 0.63 
```

Now, let’s scale the data using MinMaxScaler before fitting the SVC:

In[11]:   
preprocessing using 0-1 scaling   
scalar $=$ MinMaxScaler()   
scalar.fit(X_train)   
X_trainScaled $\equiv$ scalar.transform(X_train)   
X_testScaled $\equiv$ scalar.transform(X_test)   
# learning an SVM on the scaled training data   
svm.fit(X_trainScaled, y_train)   
# scoring on the scaled test set   
print("Scaled test set accuracy: \{:.2f\}".format(   
svm.score(X_testScaled, y_test)))

Out[11]:   
```txt
Scaled test set accuracy: 0.97 
```

As we saw before, the effect of scaling the data is quite significant. Even though scal‐ ing the data doesn’t involve any complicated math, it is good practice to use the scal‐ ing mechanisms provided by scikit-learn instead of reimplementing them yourself, as it’s easy to make mistakes even in these simple computations.

You can also easily replace one preprocessing algorithm with another by changing the class you use, as all of the preprocessing classes have the same interface, consisting of the fit and transform methods:

In[12]:   
preprocessing using zero mean and unit variance scaling from sklearn.preprocessing import StandardScaler   
scalar $=$ StandardScaler()   
scalar.fit(X_train)   
X_trainScaled $\equiv$ scorer.transform(X_train)   
X_testScaled $\equiv$ scorer.transform(X_test)

```python
learning an SVM on the scaled training data  
svm.fit(X_trainScaled, y_train)  
# scoring on the scaled test set  
print("SVM test accuracy: {:2f}".format(svm.score(X_testScaled, y_test))) 
```

# Out[12]:

SVM test accuracy: 0.96

Now that we’ve seen how simple data transformations for preprocessing work, let’s move on to more interesting transformations using unsupervised learning.

# Dimensionality Reduction, Feature Extraction, and Manifold Learning

As we discussed earlier, transforming data using unsupervised learning can have many motivations. The most common motivations are visualization, compressing the data, and finding a representation that is more informative for further processing.

One of the simplest and most widely used algorithms for all of these is principal com‐ ponent analysis. We’ll also look at two other algorithms: non-negative matrix factori‐ zation (NMF), which is commonly used for feature extraction, and t-SNE, which is commonly used for visualization using two-dimensional scatter plots.

# Principal Component Analysis (PCA)

Principal component analysis is a method that rotates the dataset in a way such that the rotated features are statistically uncorrelated. This rotation is often followed by selecting only a subset of the new features, according to how important they are for explaining the data. The following example (Figure 3-3) illustrates the effect of PCA on a synthetic two-dimensional dataset:

# In[13]:

mglearn.plots.plot_pca_illustration()

The first plot (top left) shows the original data points, colored to distinguish among them. The algorithm proceeds by first finding the direction of maximum variance, labeled “Component 1.” This is the direction (or vector) in the data that contains most of the information, or in other words, the direction along which the features are most correlated with each other. Then, the algorithm finds the direction that contains the most information while being orthogonal (at a right angle) to the first direction. In two dimensions, there is only one possible orientation that is at a right angle, but in higher-dimensional spaces there would be (infinitely) many orthogonal directions. Although the two components are drawn as arrows, it doesn’t really matter where the head and the tail are; we could have drawn the first component from the center up to

the top left instead of down to the bottom right. The directions found using this pro‐ cess are called principal components, as they are the main directions of variance in the data. In general, there are as many principal components as original features.

![](_attachments/intro-ml-python-pp145-223/627b3524c2861f9a3311d7e112bcdbdad2049b5a2a1cced0eb77621806818fea.jpg)

![](_attachments/intro-ml-python-pp145-223/19afe8160b35c8e6fdb2e902f375d99a11c812dad3384af63dcbf5165237f752.jpg)

![](_attachments/intro-ml-python-pp145-223/d2f317cc7245db9e29464a8bb03f832bac75f0e204f6370adcca1cd3ba79c0de.jpg)

![](_attachments/intro-ml-python-pp145-223/afedb5e0b2c4df6355cd37ee0d2e4d505f4e39b144959b71a210000e6021db32.jpg)  
Figure 3-3. Transformation of data with PCA

The second plot (top right) shows the same data, but now rotated so that the first principal component aligns with the x-axis and the second principal component aligns with the y-axis. Before the rotation, the mean was subtracted from the data, so that the transformed data is centered around zero. In the rotated representation found by PCA, the two axes are uncorrelated, meaning that the correlation matrix of the data in this representation is zero except for the diagonal.

We can use PCA for dimensionality reduction by retaining only some of the principal components. In this example, we might keep only the first principal component, as

shown in the third panel in Figure 3-3 (bottom left). This reduces the data from a two-dimensional dataset to a one-dimensional dataset. Note, however, that instead of keeping only one of the original features, we found the most interesting direction (top left to bottom right in the first panel) and kept this direction, the first principal component.

Finally, we can undo the rotation and add the mean back to the data. This will result in the data shown in the last panel in Figure 3-3. These points are in the original fea‐ ture space, but we kept only the information contained in the first principal compo‐ nent. This transformation is sometimes used to remove noise effects from the data or visualize what part of the information is retained using the principal components.

# Applying PCA to the cancer dataset for visualization

One of the most common applications of PCA is visualizing high-dimensional data‐ sets. As we saw in Chapter 1, it is hard to create scatter plots of data that has more than two features. For the Iris dataset, we were able to create a pair plot (Figure 1-3 in Chapter 1) that gave us a partial picture of the data by showing us all the possible combinations of two features. But if we want to look at the Breast Cancer dataset, even using a pair plot is tricky. This dataset has 30 features, which would result in $3 0 \times 1 4 = 4 2 0$ scatter plots! We’d never be able to look at all these plots in detail, let alone try to understand them.

There is an even simpler visualization we can use, though—computing histograms of each of the features for the two classes, benign and malignant cancer (Figure 3-4):

# In[14]:

```python
fig, axes = plt.subplot(15, 2, figsize=(10, 20))  
malignant = cancer.data[cancer.target == 0]  
benign = cancer.data[cancer.target == 1]  
ax = axes.ravel()  
for i in range(30):  
    _, bins = np.histogram(cancer.data[:, i], bins=50)  
    ax[i].hist(malignant[:, i], bins=bins, color=mglearn.cm3(0), alpha=.5)  
    ax[i].hist(benign[:, i], bins=bins, color=mglearn.cm3(2), alpha=.5)  
    ax[i].set_title(cancer.feature_names[i])  
    ax[i].set_y ticks(())  
ax[0].set_xlabel("Feature magnitude")  
ax[0].set_ylabel("Frequency")  
ax[0].legend(['malignant", "benign"], loc="best")  
fig.tight.layout() 
```

![](_attachments/intro-ml-python-pp145-223/9c56327cb67bc829e9c3c7a79e97a8e7ed105e6b90ca5d32597866320c8c95d0.jpg)

![](_attachments/intro-ml-python-pp145-223/d71c0fc0103f461b1e7ac5ac9be239f47a3a647bd425e9b258ae6e4ef1966370.jpg)  
mean perimeter

![](_attachments/intro-ml-python-pp145-223/7c3d845279c012f74fdd44bdf68293573e57178bfac8e15ebffc875933c23702.jpg)  
mean smoothness

![](_attachments/intro-ml-python-pp145-223/ebdb7dcae55b8b87e189712eb54e7b202cbc6e7c39849d6abe3a1c2cebfe6a7f.jpg)  
mean concavity

![](_attachments/intro-ml-python-pp145-223/757edc8a7ca57a877aadd71970d8e3a24500414de6fec21ae95cde50e607be98.jpg)  
mean symmetry

![](_attachments/intro-ml-python-pp145-223/f10c5422f855e6395a153ccd434ca6f71a987f85434fb493d34323102aa453d6.jpg)  
radius error

![](_attachments/intro-ml-python-pp145-223/17003fda6a059057da5c67a5749ea1786624d48691a76e4c2baaf53342232417.jpg)  
perimeter error

![](_attachments/intro-ml-python-pp145-223/446e94da6c4326290eafaa024cf6f7193fa720f50d8b4269e0a0c260d726efbb.jpg)  
smoothness error

![](_attachments/intro-ml-python-pp145-223/0b7efc6cc451a228375eb05cfbe5bd59878f9f55b6a276187519c517e223952c.jpg)  
concavity error

![](_attachments/intro-ml-python-pp145-223/1ef4ba1d3b1e28c646ad3d489d84cd6029d2b299b0d0dcc636ba0f9d8e4d5fab.jpg)  
symmetry error

![](_attachments/intro-ml-python-pp145-223/2b74832f25a06ed21176403d91005d607f65ae628fa6b10303a0f21fc5aeb21a.jpg)  
worst radius

![](_attachments/intro-ml-python-pp145-223/bfc1c28f91e7e8731366c54364953b1a99a7dacd6513dea8e59b1b07a61335dc.jpg)  
worst perimeter

![](_attachments/intro-ml-python-pp145-223/08b4a150a0fde1ac8b8b841c30f3decdab1f915af730b983793a710eb21aa2a5.jpg)  
worst smoothness

![](_attachments/intro-ml-python-pp145-223/d4c9ee0d230ca9de914a6f8d42fc864a6107770dfcd6e49c58de7f7b8fcd96e0.jpg)  
worst concavity

![](_attachments/intro-ml-python-pp145-223/9d17e9fba39b7d817d89553f0f9f80451791f0a2f67b8855f021c7b1b3209e49.jpg)  
worst symmetry

![](_attachments/intro-ml-python-pp145-223/efcebbb43e33690577c78efe102917adb6e73913835983e739ada8f77d947d0d.jpg)  
mean texture

![](_attachments/intro-ml-python-pp145-223/4dce0c02f57882f0690ea49ff16533541aeb24ba650f9f46964b3b8a5ec15f2a.jpg)  
mean area

![](_attachments/intro-ml-python-pp145-223/d24d64356080b965560700a24c5cf5e3127da319f337fdc74ebcdd604d8be945.jpg)  
mean compactness

![](_attachments/intro-ml-python-pp145-223/677b084b6ec95d168c1e23ebb50987f7aaaac38c9af9e520b23bc9180a1f0b06.jpg)  
mean concave points

![](_attachments/intro-ml-python-pp145-223/6bc09a2e93ae2e64b21d612ac5a74bed9e6c41d090dd519ceb09e251e30ba121.jpg)  
mean fractal dimension

![](_attachments/intro-ml-python-pp145-223/e8f0586800ded7846fdc6866429903333b14b6b7db89f4f808827a608dd58258.jpg)  
texture error

![](_attachments/intro-ml-python-pp145-223/3f57deb91b932d736528c18b520c50e062181833c13a5f93f355b32984699a7f.jpg)  
area error

![](_attachments/intro-ml-python-pp145-223/390bf018a22fae2facb53d7ee88ded38d5025c4b4cce6dd4665ad6ec4f988435.jpg)  
compactness error

![](_attachments/intro-ml-python-pp145-223/e5c1f42083d772e27094b070dcc6f7911b49ecd52c8f30815b5821be62bd39b2.jpg)  
concave points error

![](_attachments/intro-ml-python-pp145-223/e002f6d8de2f4703f0a0e5caa20a89250c82037d3b1794324781cc3b64e0b1c4.jpg)  
fractal dimension error

![](_attachments/intro-ml-python-pp145-223/f6b08d4367e646715d76131c0f03b1f2f7b4045f8ef60b695352288ddb06b0fc.jpg)  
worst texture

![](_attachments/intro-ml-python-pp145-223/71221b0bb8ca56c0929ae7c10208da0254f04636dc93a9479d9bd6428def127b.jpg)  
worst area

![](_attachments/intro-ml-python-pp145-223/3b42d2f7421e93408fcc00c0724512b6bdefccbff505628d552d19be590bb94a.jpg)  
worst compactness

![](_attachments/intro-ml-python-pp145-223/0090867d58a875555bc90a912992a91277209d8ef198d44d3488d7e8dc1e09aa.jpg)  
worst concave points

![](_attachments/intro-ml-python-pp145-223/6294b709e1b3475fbd07860936da08639d18bdf6db5aeb5c743f1c6e59c59810.jpg)  
worst fractal dimension   
Figure 3-4. Per-class feature histograms on the Breast Cancer dataset

Here we create a histogram for each of the features, counting how often a data point appears with a feature in a certain range (called a bin). Each plot overlays two histo‐ grams, one for all of the points in the benign class (blue) and one for all the points in the malignant class (red). This gives us some idea of how each feature is distributed across the two classes, and allows us to venture a guess as to which features are better at distinguishing malignant and benign samples. For example, the feature “smooth‐ ness error” seems quite uninformative, because the two histograms mostly overlap, while the feature “worst concave points” seems quite informative, because the histo‐ grams are quite disjoint.

However, this plot doesn’t show us anything about the interactions between variables and how these relate to the classes. Using PCA, we can capture the main interactions and get a slightly more complete picture. We can find the first two principal compo‐ nents, and visualize the data in this new two-dimensional space with a single scatter plot.

Before we apply PCA, we scale our data so that each feature has unit variance using StandardScaler:

# In[15]:

```python
from sklearn.datasets import load_breast_cancer  
cancer = load_breast_cancer()  
scalar = StandardScaler()  
scalar.fit(cancer.data)  
X Sized = scalar.transform(cancer.data) 
```

Learning the PCA transformation and applying it is as simple as applying a prepro‐ cessing transformation. We instantiate the PCA object, find the principal components by calling the fit method, and then apply the rotation and dimensionality reduction by calling transform. By default, PCA only rotates (and shifts) the data, but keeps all principal components. To reduce the dimensionality of the data, we need to specify how many components we want to keep when creating the PCA object:

# In[16]:

```python
from sklearn.decomposition import PCA   
# keep the first two principal components of the data   
PCA \(=\) PCA(n_components=2)   
# fit PCA model to breast cancer data   
PCA.fit(Xscaled)   
# transform data onto the first two principal components   
X_pca \(=\) PCA.transform(Xscaled)   
print("Original shape: \{\}\).format(str(XScaled.shape)))   
print("Reduced shape: \{\}\).format(str(X_pca.shape))) 
```

# Out[16]:

Original shape: (569, 30)

Reduced shape: (569, 2)

We can now plot the first two principal components (Figure 3-5):

# In[17]:

```python
plot first vs. second principal component, colored by class  
plt.figure(figsize=(8, 8))  
mlearn.discreteRIA(X_pca[., 0], X_pca[., 1], cancer_target)  
plt.legend(cancer_target_names, loc="best")  
plt.gca().set_aspect("equal")  
plt.xlabel("First principal component")  
pltylabel("Second principal component") 
```

![](_attachments/intro-ml-python-pp145-223/b00e44be926c41300c84aaecedec28070e1aa82223c31289cdc803b30ef3cf9e.jpg)  
Figure 3-5. Two-dimensional scatter plot of the Breast Cancer dataset using the first two principal components

It is important to note that PCA is an unsupervised method, and does not use any class information when finding the rotation. It simply looks at the correlations in the data. For the scatter plot shown here, we plotted the first principal component against the

second principal component, and then used the class information to color the points. You can see that the two classes separate quite well in this two-dimensional space. This leads us to believe that even a linear classifier (that would learn a line in this space) could do a reasonably good job at distinguishing the two classes. We can also see that the malignant (red) points are more spread out than the benign (blue) points —something that we could already see a bit from the histograms in Figure 3-4.

A downside of PCA is that the two axes in the plot are often not very easy to interpret. The principal components correspond to directions in the original data, so they are combinations of the original features. However, these combinations are usually very complex, as we’ll see shortly. The principal components themselves are stored in the components_ attribute of the PCA object during fitting:

# In[18]:

print("PCA component shape: {}".format(pca.components_.shape))

# Out[18]:

PCA component shape: (2, 30)

Each row in components_ corresponds to one principal component, and they are sor‐ ted by their importance (the first principal component comes first, etc.). The columns correspond to the original features attribute of the PCA in this example, “mean radius,” “mean texture,” and so on. Let’s have a look at the content of components_:

# In[19]:

print("PCA components:\n{}".format(pca.components_))

# Out[19]:

PCA components:

```json
[0.219 0.104 0.228 0.221 0.143 0.239 0.258 0.261 0.138 0.064 0.206 0.017 0.211 0.203 0.015 0.17 0.154 0.183 0.042 0.103 0.228 0.104 0.237 0.225 0.128 0.21 0.229 0.251 0.123] [-0.234 -0.06 -0.215 -0.231 0.186 0.152 0.06 -0.035 0.19 0.367 -0.106 0.09 -0.089 -0.152 0.204 0.233 0.197 0.13 0.184 0.28 -0.22 -0.045 -0.2 -0.219 0.172 0.144 0.098 -0.008 0.142 0.275]] 
```

We can also visualize the coefficients using a heat map (Figure 3-6), which might be easier to understand:

# In[20]:

```python
plt matplotlib(pca_components_, cmap='viridis')  
plt;y ticks([0, 1], ["First component", "Second component")]  
plt.colorbar()  
plt.x ticks(range(len(cancer.feature_names)),  
                     cancer feature_names, rotation=60, ha='left')  
plt.xlabel("Feature")  
pltylabel("Principal components") 
```

![](_attachments/intro-ml-python-pp145-223/000cf39ce07fb8062a71d0758a9c6754f17ea70bd0299ff76566daccab56a438.jpg)  
Figure 3-6. Heat map of the first two principal components on the Breast Cancer dataset

You can see that in the first component, all features have the same sign (it’s negative, but as we mentioned earlier, it doesn’t matter which direction the arrow points in). That means that there is a general correlation between all features. As one measure‐ ment is high, the others are likely to be high as well. The second component has mixed signs, and both of the components involve all of the 30 features. This mixing of all features is what makes explaining the axes in Figure 3-6 so tricky.

# Eigenfaces for feature extraction

Another application of PCA that we mentioned earlier is feature extraction. The idea behind feature extraction is that it is possible to find a representation of your data that is better suited to analysis than the raw representation you were given. A great example of an application where feature extraction is helpful is with images. Images are made up of pixels, usually stored as red, green, and blue (RGB) intensities. Objects in images are usually made up of thousands of pixels, and only together are they meaningful.

We will give a very simple application of feature extraction on images using PCA, by working with face images from the Labeled Faces in the Wild dataset. This dataset contains face images of celebrities downloaded from the Internet, and it includes faces of politicians, singers, actors, and athletes from the early 2000s. We use gray‐ scale versions of these images, and scale them down for faster processing. You can see some of the images in Figure 3-7:

# In[21]:

from sklearn.datasets import fetch_lfw_people   
people $=$ fetch_lfw_people(min Faces_per_person $= 20$ , resize $= 0.7$ image_shape $=$ people/images[0].shape   
fix,axes $=$ plt.subplot(2,5,figsize $= (15$ ,8), subplot_kw $\coloneqq$ {'xticks':（）,'yticks':（）}]   
for target, image, ax in zip(people.target, people/images, axes.ravel()): ax.imshow(image) ax.set_title(people.target_names[target])

![](_attachments/intro-ml-python-pp145-223/ba3ce1010a9478c4d9a531f7835dbc9c18cf7cb9ad15ce71db7bd2b7a38b8670.jpg)

![](_attachments/intro-ml-python-pp145-223/65174829b83170d2b689881636b79c6a2cf575ac3711b5eb001ddf5393633488.jpg)

![](_attachments/intro-ml-python-pp145-223/26f39045b06886b7b28a383de08c4aeebb280a4665603bbd0e1e95eba35f8168.jpg)

![](_attachments/intro-ml-python-pp145-223/3f9fd70ccf1f7dac24c2b57f8d44c1179f0f5397e84b0b7fa93f116cd3aae71f.jpg)

![](_attachments/intro-ml-python-pp145-223/b4bec01b2e067735f19b845fca23d4b9cbb2453de0d42faa5a8e08cae15780a2.jpg)

![](_attachments/intro-ml-python-pp145-223/6bf7d26d62475e25c7fcc7e9f5c6e711ebee8abfcd932bfef51890e521b98efd.jpg)

![](_attachments/intro-ml-python-pp145-223/8f863897b1c13b7aa3ed4e78683c128977593020189dfa49dc4e251f6212c952.jpg)

![](_attachments/intro-ml-python-pp145-223/3e04f39126abdb99b242e1dc678b41b9108f55d2292d7a68d11de22b7660af40.jpg)

![](_attachments/intro-ml-python-pp145-223/f0a6f418811d4653ab486404a96132afb9ae41102be0f7157be67eb747426f18.jpg)

![](_attachments/intro-ml-python-pp145-223/59e4bccfea519074c0b99a4ff55769c38c277289bb28c150971920127a7b7963.jpg)  
Figure 3-7. Some images from the Labeled Faces in the Wild dataset

There are 3,023 images, each $8 7 \times 6 5$ pixels large, belonging to 62 different people:

In[22]:

```txt
print("people/images.shape: {}".format(people/images.shape))  
print("Number of classes: {}.format(len(people.target_names))) 
```

Out[22]:

```txt
people/images.shape: (3023, 87, 65)  
Number of classes: 62 
```

The dataset is a bit skewed, however, containing a lot of images of George W. Bush and Colin Powell, as you can see here:

In[23]:

```python
count how often each target appears  
counts = np.bicount(people.target)  
# print counts next to target names  
for i, (count, name) in enumerate(zip(counts, people.target_names)):  
    print(['0:25] {1:3}).format(name, count), end='')  
if (i + 1) % 3 == 0:  
    print() 
```

Out[23]:   
Alejandro Toledo 39 Alvaro Uribe 35  
Amelie Mauresmo 21 Andre Agassi 36  
Angelina Jolie 20 Arnold Schwarzenegger 42  
Atal Bihari Vajpayee 24 Bill Clinton 29  
Carlos Menem 21 Colin Powell 236  
David Beckham 31 Donald Rumsfeld 121  
George W Bush 530 George Robertson 22  
Gerhard Schroeder 109 Gloria Macapagal Arroyo 44  
Gray Davis 26 Guillermo Coria 30  
Hamid Karzai 22 Hans Blix 39  
Hugo Chavez 71 Igor Ivanov [...] 20  
Laura Bush 41 Lindsay Davenport 22  
Lleyton Hewitt 41 Luiz Inacio Lula da Silva 48  
Mahmoud Abbas 29 Megawati Sukarnoputri 33  
Michael Bloomberg 20 Naomi Watts 22  
Nestor Kirchner 37 Paul Bremer 20  
Pete Sampras 22 Recep Tayyip Erdogan 30  
Ricardo Lagos 27 Roh Moo-hyun 32  
Rudolph Giuliani 26 Saddam Hussein 23  
Serena Williams 52 Silvio Berlusconi 33  
Tiger Woods 23 Tom Daschle 25  
Tom Ridge 33 Tony Blair 144  
Vicente Fox 32 Vladimir Putin 49  
Winona Ryder 24

To make the data less skewed, we will only take up to 50 images of each person (otherwise, the feature extraction would be overwhelmed by the likelihood of George W. Bush):

In[24]:   
mask = np.zeros(people.target.shape, dtype=np(bool)  
for target in np.unique(people.target):  
    mask[np.where(people.target == target)[0][[:50]] = 1  
X_people = people.data[mask]  
y_people = people.target[mask]  
# scale the grayscale values to be between 0 and 1  
# instead of 0 and 255 for better numeric stability  
X_people = X_people / 255.

A common task in face recognition is to ask if a previously unseen face belongs to a known person from a database. This has applications in photo collection, social media, and security applications. One way to solve this problem would be to build a classifier where each person is a separate class. However, there are usually many dif‐ ferent people in face databases, and very few images of the same person (i.e., very few training examples per class). That makes it hard to train most classifiers. Additionally,

you often want to be able to add new people easily, without needing to retrain a large model.

A simple solution is to use a one-nearest-neighbor classifier that looks for the most similar face image to the face you are classifying. This classifier could in principle work with only a single training example per class. Let’s take a look at how well KNeighborsClassifier does here:

# In[25]:

from sklearn.neighbors import KNeighborsClassifier
# split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(   ) $\mathrm{X}$ _people, y_people, stratify=y_people, random_state $= 0$ )
# build a KNeighborsClassifier using one neighbor
knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(X_train, y_train)
print("Test set score of 1-nn: \{:.2f\}".format(knn.score(X_test, y_test)))

# Out[25]:

Test set score of 1-nn: 0.27

We obtain an accuracy of $2 6 . 6 \%$ , which is not actually that bad for a 62-class classifi‐ cation problem (random guessing would give you around $1 / 6 2 = 1 . 5 \%$ accuracy), but is also not great. We only correctly identify a person every fourth time.

This is where PCA comes in. Computing distances in the original pixel space is quite a bad way to measure similarity between faces. When using a pixel representation to compare two images, we compare the grayscale value of each individual pixel to the value of the pixel in the corresponding position in the other image. This representa‐ tion is quite different from how humans would interpret the image of a face, and it is hard to capture the facial features using this raw representation. For example, using pixel distances means that shifting a face by one pixel to the right corresponds to a drastic change, with a completely different representation. We hope that using distan‐ ces along principal components can improve our accuracy. Here, we enable the whitening option of PCA, which rescales the principal components to have the same scale. This is the same as using StandardScaler after the transformation. Reusing the data from Figure 3-3 again, whitening corresponds to not only rotating the data, but also rescaling it so that the center panel is a circle instead of an ellipse (see Figure 3-8):

# In[26]:

```txt
mlearnplots.plot_pca_whitening() 
```

![](_attachments/intro-ml-python-pp145-223/4af28fed40585429f4bdf0eba522e55450fadfa4693f04c500e0540fed6fe2a6.jpg)

![](_attachments/intro-ml-python-pp145-223/1a94d70ada37a65a72aa86779098f8a3bc1b69dd3c1b41955181fa808491b65f.jpg)  
Figure 3-8. Transformation of data with PCA using whitening

We fit the PCA object to the training data and extract the first 100 principal compo‐ nents. Then we transform the training and test data:

# In[27]:

$\begin{array}{rl} & {\mathrm{pca} = \mathrm{PCA}(\mathrm{n\_components} = 100,\mathrm{whiten} = \mathrm{True},\mathrm{random\_state} = 0).\mathrm{fit}(\mathrm{X\_train})}\\ & {\mathrm{X\_train\_pca} = \mathrm{pca.transform}(\mathrm{X\_train})}\\ & {\mathrm{X\_test\_pca} = \mathrm{pca.transform}(\mathrm{X\_test})} \end{array}$ print("X_train_pca.shape:{}.format(X_train_pca.shape))

# Out[27]:

X_train_pca.shape: (1537, 100)

The new data has 100 features, the first 100 principal components. Now, we can use the new representation to classify our images using a one-nearest-neighbors classifier:

# In[28]:

```python
knn = KNeighborsClassifier(n_neighbors=1)  
knn.fit(X_train_pca, y_train)  
print("Test set accuracy: {:.2f}".format(knn.score(X_test_pca, y_test))) 
```

# Out[28]:

Test set accuracy: 0.36

Our accuracy improved quite significantly, from $2 6 . 6 \%$ to $3 5 . 7 \%$ , confirming our intuition that the principal components might provide a better representation of the data.

For image data, we can also easily visualize the principal components that are found. Remember that components correspond to directions in the input space. The input space here is $5 0 \times 3 7$ -pixel grayscale images, so directions within this space are also $5 0 \times 3 7$ -pixel grayscale images.

Let’s look at the first couple of principal components (Figure 3-9):

In[29]:   
```python
print("pca_components_.shape: {}".format(pca_components_.shape)) 
```

Out[29]:   
In[30]:   
```python
pca_components_.shape: (100, 5655) 
```

```python
fix, axes = plt.subplot(3, 5, figsize=(15, 12),subplot_kw={'xticks':'（）,'yticks':'（）})  
for i, (component, ax) in enumerate(zip(pca_components_, axes.ravel()))):ax.imshow(component.reshape(image_shape),cmap='viridis')ax.set_title({}.component".format((i + 1))) 
```

While we certainly cannot understand all aspects of these components, we can guess which aspects of the face images some of the components are capturing. The first component seems to mostly encode the contrast between the face and the back‐ ground, the second component encodes differences in lighting between the right and the left half of the face, and so on. While this representation is slightly more semantic than the raw pixel values, it is still quite far from how a human might perceive a face. As the PCA model is based on pixels, the alignment of the face (the position of eyes, chin, and nose) and the lighting both have a strong influence on how similar two images are in their pixel representation. But alignment and lighting are probably not what a human would perceive first. When asking people to rate similarity of faces, they are more likely to use attributes like age, gender, facial expression, and hair style, which are attributes that are hard to infer from the pixel intensities. It’s important to keep in mind that algorithms often interpret data (particularly visual data, such as images, which humans are very familiar with) quite differently from how a human would.

![](_attachments/intro-ml-python-pp145-223/33ef3071dee1b8a8ac11b96ef5148213b38aff6ef79d2e2e3c81de663f3970a1.jpg)

![](_attachments/intro-ml-python-pp145-223/be2f5b316a66fcd8e9a4d0f365985428425ec1b33e3a67831ee0c3c2aaea3595.jpg)

![](_attachments/intro-ml-python-pp145-223/36f0e4d7b80b6249cc9660e9ebb4a21084fe86d04566c96cf5b7a6cab2319f4b.jpg)

![](_attachments/intro-ml-python-pp145-223/5686cd02a46972110dc3fec9c09e9b49c2900234b7bcfd53d9fcaf01f62d364b.jpg)

![](_attachments/intro-ml-python-pp145-223/cfb9795d57bfa6c53371e93c38451c330584b406caf84850c36dea802c328297.jpg)

![](_attachments/intro-ml-python-pp145-223/233322d7203afe9c0edc5bce31003d2ee164ab94cfb8c9a4621a2608fd6d3128.jpg)

![](_attachments/intro-ml-python-pp145-223/fc375c8f8585a4df99b87686326f939ece66bb18b9c8e3e2b8acdcf837d7a2b0.jpg)

![](_attachments/intro-ml-python-pp145-223/07c00600d0eb52a04737990b2df0e24d29ceb63803602420a0348f07e4e3d5d0.jpg)

![](_attachments/intro-ml-python-pp145-223/999607abefb87dec1237f29cfd11a8e94a60e6aeec5b745650673712056d97ae.jpg)

![](_attachments/intro-ml-python-pp145-223/36214d5855f061b21027d539c9fa6c0709d7f50b3c0f637ce5a7c8750012aa50.jpg)

![](_attachments/intro-ml-python-pp145-223/9d7aa03ebb48dca0d20977126ad7f3d03e325432086f112e41d5687ebaba8ef8.jpg)

![](_attachments/intro-ml-python-pp145-223/e3ec05724bd15c293b4b0abf428b36c32cb876e2d23b1ea9eebb181fa4a7a4da.jpg)

![](_attachments/intro-ml-python-pp145-223/f1017704e2c79a646b39e668e427a651d306ed1b5533dd5f9eb601c8cc3d91c1.jpg)

![](_attachments/intro-ml-python-pp145-223/7a641d22478825e567475b7d35cc2b58d056e2c446bb3989dca735222748d341.jpg)

![](_attachments/intro-ml-python-pp145-223/6263415999152cfafc53ba5b12bef6abc075a36c8e843a5ddd86f12a2ea97695.jpg)  
Figure 3-9. Component vectors of the first 15 principal components of the faces dataset

Let’s come back to the specific case of PCA, though. We introduced the PCA transfor‐ mation as rotating the data and then dropping the components with low variance. Another useful interpretation is to try to find some numbers (the new feature values after the PCA rotation) so that we can express the test points as a weighted sum of the principal components (see Figure 3-10).

![](_attachments/intro-ml-python-pp145-223/0a23e563eae4996c3a9d0d30526ad8ae9c0f182fc9c4e84dfc3490955d0b7647.jpg)

![](_attachments/intro-ml-python-pp145-223/acee221e7298887247b142898438a373d46404d99134a19002d115ed11a970d8.jpg)  
≈ X0*   
+ X1*

![](_attachments/intro-ml-python-pp145-223/183a9a34fceb2dfd850628d529c3f16221275ad12ab4d129b3ac67ce8068acc9.jpg)

![](_attachments/intro-ml-python-pp145-223/cb5c7c28fff24af51fd9b0a39daa2ff1964615fe2854f83005a60c80da5a61a5.jpg)

![](_attachments/intro-ml-python-pp145-223/970577ae4f3ae73e8dec3fea0a02fc10ef95f11600dad9633a9e25a065567240.jpg)  
Figure 3-10. Schematic view of PCA as decomposing an image into a weighted sum of components

Here, $x _ { 0 } , x _ { \mathrm { 1 } } .$ , and so on are the coefficients of the principal components for this data point; in other words, they are the representation of the image in the rotated space.

Another way we can try to understand what a PCA model is doing is by looking at the reconstructions of the original data using only some components. In Figure 3-3, after dropping the second component and arriving at the third panel, we undid the rotation and added the mean back to obtain new points in the original space with the second component removed, as shown in the last panel. We can do a similar transfor‐ mation for the faces by reducing the data to only some principal components and then rotating back into the original space. This return to the original feature space can be done using the inverse_transform method. Here, we visualize the recon‐ struction of some faces using 10, 50, 100, 500, or 2,000 components (Figure 3-11):

# In[32]:

mglearn.plots.plot_pca_faces(X_train, X_test, image_shape)

![](_attachments/intro-ml-python-pp145-223/33faed595b1f603e25558fd75e3f15746af526b08bb81fb6619209056ffa2f11.jpg)  
Figure 3-11. Reconstructing three face images using increasing numbers of principal components

You can see that when we use only the first 10 principal components, only the essence of the picture, like the face orientation and lighting, is captured. By using more and more principal components, more and more details in the image are preserved. This

corresponds to extending the sum in Figure 3-10 to include more and more terms. Using as many components as there are pixels would mean that we would not discard any information after the rotation, and we would reconstruct the image perfectly.

We can also try to use PCA to visualize all the faces in the dataset in a scatter plot using the first two principal components (Figure 3-12), with classes given by who is shown in the image, similarly to what we did for the cancer dataset:

# In[33]:

```txt
mlearn.discrete_scan(X_train_pca[., 0], X_train_pca[., 1], y_train)  
plt.xlabel("First principal component")  
pltylabel("Second principal component") 
```

![](_attachments/intro-ml-python-pp145-223/a97e2e8fdca2b8723fc9ac6d04a7c65a892ae787c95dc46fe5c185f1af32de17.jpg)  
Figure 3-12. Scatter plot of the faces dataset using the first two principal components (see Figure 3-5 for the corresponding image for the cancer dataset)

As you can see, when we use only the first two principal components the whole data is just a big blob, with no separation of classes visible. This is not very surprising, given that even with 10 components, as shown earlier in Figure 3-11, PCA only cap‐ tures very rough characteristics of the faces.

# Non-Negative Matrix Factorization (NMF)

Non-negative matrix factorization is another unsupervised learning algorithm that aims to extract useful features. It works similarly to PCA and can also be used for dimensionality reduction. As in PCA, we are trying to write each data point as a weighted sum of some components, as illustrated in Figure 3-10. But whereas in PCA we wanted components that were orthogonal and that explained as much variance of the data as possible, in NMF, we want the components and the coefficients to be nonnegative; that is, we want both the components and the coefficients to be greater than or equal to zero. Consequently, this method can only be applied to data where each feature is non-negative, as a non-negative sum of non-negative components cannot become negative.

The process of decomposing data into a non-negative weighted sum is particularly helpful for data that is created as the addition (or overlay) of several independent sources, such as an audio track of multiple people speaking, or music with many instruments. In these situations, NMF can identify the original components that make up the combined data. Overall, NMF leads to more interpretable components than PCA, as negative components and coefficients can lead to hard-to-interpret can‐ cellation effects. The eigenfaces in Figure 3-9, for example, contain both positive and negative parts, and as we mentioned in the description of PCA, the sign is actually arbitrary. Before we apply NMF to the face dataset, let’s briefly revisit the synthetic data.

# Applying NMF to synthetic data

In contrast to when using PCA, we need to ensure that our data is positive for NMF to be able to operate on the data. This means where the data lies relative to the origin (0, 0) actually matters for NMF. Therefore, you can think of the non-negative compo‐ nents that are extracted as directions from (0, 0) toward the data.

The following example (Figure 3-13) shows the results of NMF on the twodimensional toy data:

# In[34]:

mglearn.plots.plot_nmf_illustration()

![](_attachments/intro-ml-python-pp145-223/0a74095995de7623b9dd265b5d16520c3c62c178b435e40f161c5f4f1cd28bfb.jpg)

![](_attachments/intro-ml-python-pp145-223/ffc27180a46ff7b25a13bbc2d8c696a60c2b951c0d7f23e3949c41781315553f.jpg)  
Figure 3-13. Components found by non-negative matrix factorization with two compo‐ nents (left) and one component (right)

For NMF with two components, as shown on the left, it is clear that all points in the data can be written as a positive combination of the two components. If there are enough components to perfectly reconstruct the data (as many components as there are features), the algorithm will choose directions that point toward the extremes of the data.

If we only use a single component, NMF creates a component that points toward the mean, as pointing there best explains the data. You can see that in contrast with PCA, reducing the number of components not only removes some directions, but creates an entirely different set of components! Components in NMF are also not ordered in any specific way, so there is no “first non-negative component”: all components play an equal part.

NMF uses a random initialization, which might lead to different results depending on the random seed. In relatively simple cases such as the synthetic data with two com‐ ponents, where all the data can be explained perfectly, the randomness has little effect (though it might change the order or scale of the components). In more complex sit‐ uations, there might be more drastic changes.

# Applying NMF to face images

Now, let’s apply NMF to the Labeled Faces in the Wild dataset we used earlier. The main parameter of NMF is how many components we want to extract. Usually this is lower than the number of input features (otherwise, the data could be explained by making each pixel a separate component).

First, let’s inspect how the number of components impacts how well the data can be reconstructed using NMF (Figure 3-14):

# In[35]:

mglearn.plots.plot_nmf_faces(X_train, X_test, image_shape)

![](_attachments/intro-ml-python-pp145-223/c27312658c095cddba42cefaf5c7624d8f5f5b3825ed6b6cf91cf749ea92d81d.jpg)  
Figure 3-14. Reconstructing three face images using increasing numbers of components found by NMF

The quality of the back-transformed data is similar to when using PCA, but slightly worse. This is expected, as PCA finds the optimum directions in terms of reconstruc‐ tion. NMF is usually not used for its ability to reconstruct or encode data, but rather for finding interesting patterns within the data.

As a first look into the data, let’s try extracting only a few components (say, 15).

Figure 3-15 shows the result:

In[36]:   
from sklearn.decomposition import NMF   
nmf $=$ NMF(n_components=15, random_state $\coloneqq 0$ nmf.fit(X_train)   
X_train_nmf $=$ nmf.transform(X_train)   
X_test_nmf $=$ nmf.transform(X_test)   
fix,axes $=$ plt.subplot(3,5,figsize=(15,12),subplot_kw={'xticks':（），'yticks':（）})   
for i,(component，ax)in enumerate(zip(nmf_components_,axes.ravel())): ax.imshow(component.reshape(image_shape)) ax.set_title({}.component".format(i))

![](_attachments/intro-ml-python-pp145-223/b7b58161ab7ba3293327014b2e02f35a9b3b34b80295093cf8dbeba810974df1.jpg)

![](_attachments/intro-ml-python-pp145-223/b462d837db5ecf5ddf37ad1fa8e27fca4e0d87f52b6303f619d77349ac6610cb.jpg)

![](_attachments/intro-ml-python-pp145-223/e87ca3a725f5e794262f9bbf9efb8c8c833e0a296d1ebb226cdd4b488f86c579.jpg)

![](_attachments/intro-ml-python-pp145-223/c2d8059cb87241a0103a1eb4ee6d412224ad918cac3b3cfc7131b15bd9578238.jpg)

![](_attachments/intro-ml-python-pp145-223/b385bed122854283383e017a7362a384988e4ff272d5b38c98be09ca22d50f91.jpg)

![](_attachments/intro-ml-python-pp145-223/0390bfbe7a542e0d743da9eae41f4d8a9dbe767e327659552997aa1469f27e68.jpg)

![](_attachments/intro-ml-python-pp145-223/8fa35cba5074b46e21b4cbd715ed44542d53524fd84c93074c9a95056c0ecc58.jpg)

![](_attachments/intro-ml-python-pp145-223/539eb4cc31b1072c63891cd4415e6a74603aafbc56f4de5f1bb6a7e6c0829ef4.jpg)

![](_attachments/intro-ml-python-pp145-223/22f7f04583e1974ba216b6417e50027bccefc4e890b52c54fd3bee56452f29b9.jpg)

![](_attachments/intro-ml-python-pp145-223/a4af580c003160698c209e891090054b3978993b10eb62c37ff59b2eb55e67c8.jpg)

![](_attachments/intro-ml-python-pp145-223/8c09736f82ec941dafb5378aa7a611a4224bcc0467c9549f2e2350a96e07a6df.jpg)

![](_attachments/intro-ml-python-pp145-223/45b756d02561306859a0d2f68d51e94b107ea686c2cc0adfecf69ec006d4695d.jpg)

![](_attachments/intro-ml-python-pp145-223/58795354c208c87d346c171976f72d36db6abd5ad986f57fc561892765a641ba.jpg)

![](_attachments/intro-ml-python-pp145-223/d127238e16f34a8f5fde4efc6fa7c4fcf0c39a324c1327ecad98474e7ad8df39.jpg)

![](_attachments/intro-ml-python-pp145-223/9f8e973213d16564a03ea89ad9bb6c42d4deabeb80f55cd1e6caac1963e72e1d.jpg)  
Figure 3-15. e components found by NMF on the faces dataset when using 15 compo‐ nents

These components are all positive, and so resemble prototypes of faces much more so than the components shown for PCA in Figure 3-9. For example, one can clearly see that component 3 shows a face rotated somewhat to the right, while component 7 shows a face somewhat rotated to the left. Let’s look at the images for which these components are particularly strong, shown in Figures 3-16 and 3-17:

In[37]:   
compn $= 3$ # sort by 3rd component, plot first 10 images   
inds $=$ np.argmax(X_train_nmf[., compn])[::-1]   
fig, axes $=$ plt.subplot(2,5,figsize $\coloneqq$ (15,8),subplot_kw={'xticks':(), 'yticks':()})   
for i, (ind, ax) in enumerate(zip(inds, axes.ravel)): ax.imshow(X_train[ind].reshape(image_shape))   
compn $= 7$ # sort by 7th component, plot first 10 images   
inds $=$ np.argmax(X_train_nmf[., compn])[::-1]   
fig, axes $=$ plt.subplot(2,5,figsize $\coloneqq$ (15,8),subplot_kw={'xticks':(), 'yticks':()})   
for i, (ind, ax) in enumerate(zip(inds, axes.ravel)): ax.imshow(X_train[ind].reshape(image_shape))

![](_attachments/intro-ml-python-pp145-223/50f8ad8daf8c9f982a08333f1a761e366b16e59ab3cc7036b8dc67676597452f.jpg)

![](_attachments/intro-ml-python-pp145-223/dd196d82339e188baabf1b939a92838852f16c1d1c0ab48d3bbd3b8efae4b939.jpg)

![](_attachments/intro-ml-python-pp145-223/6d5f36f4587ec4cda5c9ba6e02fcefbc804d50722df6671346d722e8e313846d.jpg)

![](_attachments/intro-ml-python-pp145-223/9968e68430bba0fcab6b41f7981c4a80a17881164b042b9399ebc3f907bd574b.jpg)

![](_attachments/intro-ml-python-pp145-223/6f36447376b1b6696001e6bd4cbe0215ead560e12e443cf01df25dc3b2b2cedc.jpg)

![](_attachments/intro-ml-python-pp145-223/3d41a0a8030916a3aca320feb7dbd1c1b5202fd7f2a6c964bcacb793456ab874.jpg)

![](_attachments/intro-ml-python-pp145-223/7c078934a9b8d5df8532b098ad598e8e085eacb0e22c7b50b42bc06c72b34b8f.jpg)

![](_attachments/intro-ml-python-pp145-223/9c56d7417bbd73d56969cb32ee97501d048227e3d17b19be5c30338c0fd03ea1.jpg)

![](_attachments/intro-ml-python-pp145-223/db48e163f79093f9ee3ab8e79329be56206444d6fc277beea1a4b629d47d3d06.jpg)

![](_attachments/intro-ml-python-pp145-223/db001b2043833db1b78feca95f5a84a91ad3f140607650bd57d1feca1adf744a.jpg)  
Figure 3-16. Faces that have a large coefficient for component 3

![](_attachments/intro-ml-python-pp145-223/2cff401878d7d266aef5b5eac4162c44934e39b9c37da23e4f9802e124ea3c7d.jpg)

![](_attachments/intro-ml-python-pp145-223/51456f9fba96c3a9b8450dbc7967aa8519fccb3638d4d56a2010b7d1744f93a4.jpg)

![](_attachments/intro-ml-python-pp145-223/363aba6f5f19d280e0aa49e0e8c638f2127256e807e7851f3bc062204cd9b378.jpg)

![](_attachments/intro-ml-python-pp145-223/4f6d86f81c88d811df513b820e5fa522aa2172b4af826b7f5c11a65e8a3a64a2.jpg)

![](_attachments/intro-ml-python-pp145-223/6d8ae13651867979a5210882403c91ad8541ec83209ae52fe82fea9406fec5f1.jpg)

![](_attachments/intro-ml-python-pp145-223/be0aa9d91dc418a42ca48c8756e6d162b1760aa2012cbfc2ba984697a64cea1b.jpg)

![](_attachments/intro-ml-python-pp145-223/277ab9e348f86a8554525eaad8efa8e09e3b57cedadf8b04037442fe857fb25a.jpg)

![](_attachments/intro-ml-python-pp145-223/9e6ebe97d683d1497ce0db655b3d638cb4f7af6f01897fe9eea343eb25d09572.jpg)

![](_attachments/intro-ml-python-pp145-223/a581a56ee1ef7ac53bf1f55ae5df73ce35501c7f899d1ff7eed31bb2147f02bd.jpg)

![](_attachments/intro-ml-python-pp145-223/a39b72d8a0f7f0f5851bafac9c060c3af107a33d198e46ac6a9508b82e8780ff.jpg)  
Figure 3-17. Faces that have a large coefficient for component 7

As expected, faces that have a high coefficient for component 3 are faces looking to the right (Figure 3-16), while faces with a high coefficient for component 7 are look‐ ing to the left (Figure 3-17). As mentioned earlier, extracting patterns like these works best for data with additive structure, including audio, gene expression, and text data. Let’s walk through one example on synthetic data to see what this might look like.

Let’s say we are interested in a signal that is a combination of three different sources (Figure 3-18):

# In[38]:

```lua
S = mlearndatasets.makeSignals()
plt.figure(figsize=(6,1))
plt.plot(S,'--')
plt.xlabel("Time")
pltylabel("Signal") 
```

![](_attachments/intro-ml-python-pp145-223/a5c4932fd5ae0c0cd1647865be36513fae14e74f1f7c74cbd0bc8c11047318fb.jpg)  
Figure 3-18. Original signal sources

Unfortunately we cannot observe the original signals, but only an additive mixture of all three of them. We want to recover the decomposition of the mixed signal into the original components. We assume that we have many different ways to observe the mixture (say 100 measurement devices), each of which provides us with a series of measurements:

In[39]:   
```txt
mix data into a 100-dimensional state  
A = np.random.RandomState(θ).uniform(size=(100,3))  
X = np.dot(S,A.T)  
print("Shape of measurements: {}".format(X.shape)) 
```

Out[39]:   
```txt
Shape of measurements: (2000, 100) 
```

We can use NMF to recover the three signals:

In[40]:   
```python
nmf = NMF(n_components=3, random_state=42)  
S_ = nmf.fit_transform(X)  
print("Recovered signal shape: {}.format(S_.shape)) 
```

Out[40]:   
```txt
Recovered signal shape: (2000, 3) 
```

For comparison, we also apply PCA:

In[41]:   
Figure 3-19 shows the signal activity that was discovered by NMF and PCA:   
$\mathrm{pca} = \mathrm{PCA}(\mathrm{n\_components} = 3)$ H = PCA.fit_transform(X)

In[42]:   
models $=$ [X,S,S_,H]   
names $=$ ['Observations(first three measurements)'] 'True sources', NMF recovered signals', PCA recovered signals']   
fig,axes $=$ plt.subplot(4,figsize $\coloneqq$ (8,4),gridspec_kw={'hspace':.5}, subplot_kw $=$ {'xticks':(),'yticks':()})   
for model,name,ax in zip/models,names,axes): ax.set_title(name) ax.plot(model[:,:3],'-')

![](_attachments/intro-ml-python-pp145-223/8617418d0b525305f1a6d235f1effa5f8e4c2fa6c3c5547dc1a921b660ea3db8.jpg)  
Observations (first three measurements)

![](_attachments/intro-ml-python-pp145-223/e17279b1123688ab4f99384b650466f3e07a344a77e4d2afbd3d02069e32a975.jpg)  
True sources

![](_attachments/intro-ml-python-pp145-223/b7e56196f70491d89073466b2a30fdd72e81271afdcc7e3a73960feea796ada1.jpg)  
NMF recovered signals

![](_attachments/intro-ml-python-pp145-223/cec01635404db4ac6a957593f8db080c03205ae74d2e60340a66ef3a1b1aff8a.jpg)  
PCA recovered signals   
Figure 3-19. Recovering mixed sources using NMF and PCA

The figure includes 3 of the 100 measurements from X for reference. As you can see, NMF did a reasonable job of discovering the original sources, while PCA failed and used the first component to explain the majority of the variation in the data. Keep in mind that the components produced by NMF have no natural ordering. In this exam‐ ple, the ordering of the NMF components is the same as in the original signal (see the shading of the three curves), but this is purely accidental.

There are many other algorithms that can be used to decompose each data point into a weighted sum of a fixed set of components, as PCA and NMF do. Discussing all of them is beyond the scope of this book, and describing the constraints made on the components and coefficients often involves probability theory. If you are interested in this kind of pattern extraction, we recommend that you study the sections of the sci kit_learn user guide on independent component analysis (ICA), factor analysis (FA), and sparse coding (dictionary learning), all of which you can find on the page about decomposition methods.

# Manifold Learning with t-SNE

While PCA is often a good first approach for transforming your data so that you might be able to visualize it using a scatter plot, the nature of the method (applying a rotation and then dropping directions) limits its usefulness, as we saw with the scatter plot of the Labeled Faces in the Wild dataset. There is a class of algorithms for visuali‐ zation called manifold learning algorithms that allow for much more complex map‐ pings, and often provide better visualizations. A particularly useful one is the t-SNE algorithm.

Manifold learning algorithms are mainly aimed at visualization, and so are rarely used to generate more than two new features. Some of them, including t-SNE, com‐ pute a new representation of the training data, but don’t allow transformations of new data. This means these algorithms cannot be applied to a test set: rather, they can only transform the data they were trained for. Manifold learning can be useful for explora‐ tory data analysis, but is rarely used if the final goal is supervised learning. The idea behind t-SNE is to find a two-dimensional representation of the data that preserves the distances between points as best as possible. t-SNE starts with a random twodimensional representation for each data point, and then tries to make points that are close in the original feature space closer, and points that are far apart in the original feature space farther apart. t-SNE puts more emphasis on points that are close by, rather than preserving distances between far-apart points. In other words, it tries to preserve the information indicating which points are neighbors to each other.

We will apply the t-SNE manifold learning algorithm on a dataset of handwritten dig‐ its that is included in scikit-learn.2 Each data point in this dataset is an $8 { \times } 8$ gray‐ scale image of a handwritten digit between 0 and 1. Figure 3-20 shows an example image for each class:

In[43]:   
```python
from sklearn.datasets import load_digits  
digits = load_digits()  
fig, axes = plt.subplot(2, 5, figsize=(10, 5), subplot_kw={'xticks':'(), 'yticks':'})  
for ax, img in zip(axs.ravel(), digits/images):  
    ax.imshow(ax) 
```

![](_attachments/intro-ml-python-pp145-223/2b6e343470c3ca54f4d0c7f24faf0f4ca24769616c99e94b1a1ae5f3bcdfc698.jpg)  
Figure 3-20. Example images from the digits dataset

Let’s use PCA to visualize the data reduced to two dimensions. We plot the first two principal components, and color each dot by its class (see Figure 3-21):

# In[44]:

```python
# build a PCA model
PCA = PCA(n_components=2)
PCA.fit(digits.data)
# transform the digits data onto the first two principal components
digits_pca = PCA.transform(digits.data)
colors = ["#476A2A", "#7851B8", "#BD3430", "#4A2D4E", "#875525",
 "#A83683", "#4E655E", "#853541", "#3A3120", "#535D8E"]
plt.figure(figsize=(10, 10))
plt.xlabel(digits_pca[:, 0].min(), digits_pca[:, 0].max())
plt[ylim(digits_pca[:, 1].min(), digits_pca[:, 1].max())
for i in range(len(digits.data)):
    # actually plot the digits as text instead of using scatter
    plt.text(digits_pca[i, 0], digits_pca[i, 1], str(digits.target[i]), color = colors[digits.target[i]], fontdict={'weight': 'bold', 'size': 9})
plt.xlabel("First principal component")
pltylabel("Second principal component") 
```

Here, we actually used the true digit classes as glyphs, to show which class is where. The digits zero, six, and four are relatively well separated using the first two principal components, though they still overlap. Most of the other digits overlap significantly.

![](_attachments/intro-ml-python-pp145-223/97aa2500a0e57dbf3ea314494853e66e0ff2f3084c091ec0effc55a2740fadbd.jpg)  
Figure 3-21. Scatter plot of the digits dataset using the first two principal components

Let’s apply t-SNE to the same dataset, and compare the results. As t-SNE does not support transforming new data, the TSNE class has no transform method. Instead, we can call the fit_transform method, which will build the model and immediately return the transformed data (see Figure 3-22):

# In[45]:

```python
from sklearn.manifold import TSNE  
tsne = TSNE(random_state=42)  
# use fit_transform instead of fit, as TSNE has no transform method  
digits-tsne = tsne.fit_transform(digits.data) 
```

In[46]:   
```python
plt.figure(figsize=(10,10))  
plt.xlabel(digits_tse[],0].min(),digits_tse[],0].max() + 1)  
pltilatedigitaltsne[1].min(),digits_tse[1].max() + 1)  
for i in range(len(digits.data)):  
    #actually plot the digits as text instead of using scatter  
    plt.text(digits_tse[i,0],digits_tse[i,1],str(digits.target[i]), color = colors[digits.target[i]], fontdict={'weight':'bold','size':9})  
plt.xlabel("t-SNE feature 0")  
plt.xlabel("t-SNE feature 1") 
```

![](_attachments/intro-ml-python-pp145-223/a0df4487941f54b34f521643051a596f9e184e623469a6e7f3cee810648ef915.jpg)  
Figure 3-22. Scatter plot of the digits dataset using two components found by t-SNE

The result of t-SNE is quite remarkable. All the classes are quite clearly separated. The ones and nines are somewhat split up, but most of the classes form a single dense group. Keep in mind that this method has no knowledge of the class labels: it is com‐ pletely unsupervised. Still, it can find a representation of the data in two dimensions that clearly separates the classes, based solely on how close points are in the original space.

The t-SNE algorithm has some tuning parameters, though it often works well with the default settings. You can try playing with perplexity and early_exaggeration, but the effects are usually minor.

# Clustering

As we described earlier, clustering is the task of partitioning the dataset into groups, called clusters. The goal is to split up the data in such a way that points within a single cluster are very similar and points in different clusters are different. Similarly to clas‐ sification algorithms, clustering algorithms assign (or predict) a number to each data point, indicating which cluster a particular point belongs to.

# k-Means Clustering

$k$ -means clustering is one of the simplest and most commonly used clustering algo‐ rithms. It tries to find cluster centers that are representative of certain regions of the data. The algorithm alternates between two steps: assigning each data point to the closest cluster center, and then setting each cluster center as the mean of the data points that are assigned to it. The algorithm is finished when the assignment of instances to clusters no longer changes. The following example (Figure 3-23) illus‐ trates the algorithm on a synthetic dataset:

In[47]:

mglearn.plots.plot_kmeans_algorithm()

![](_attachments/intro-ml-python-pp145-223/bdbdf6f11de0393cbb108dd794c074891f0a87c869021481b900aad45b33d32c.jpg)

![](_attachments/intro-ml-python-pp145-223/ecb95dd9f87d5053a3a9da4ad368a1f9853f2320a3a66242811114c09c2c1850.jpg)

![](_attachments/intro-ml-python-pp145-223/c30347d3ba72698801d7f5c18b5f1e69ff107aaf98e43ec70630f9fed90bfb15.jpg)

![](_attachments/intro-ml-python-pp145-223/dd554adca9ac5f9d6a6f379c3822ba597f5e9dd9fc165d689de624deb27f424a.jpg)

![](_attachments/intro-ml-python-pp145-223/bcd287ae7ecfb541345cc51b5f52e007211a309bf3e7dbad416fcd9790490def.jpg)

![](_attachments/intro-ml-python-pp145-223/b8b74b47a2c5ecbfab68107ad5ac1e2a32546931c20a72ebe7b1ef6eb8358cab.jpg)

![](_attachments/intro-ml-python-pp145-223/fb803e7296b6487086e81eea6929c85b9139163fd7fcfc7c1b506984e45623db.jpg)

![](_attachments/intro-ml-python-pp145-223/16b1817859ce7b6636553e32c0a879498e9fc8f7d9bb9b41e03357ad4795f873.jpg)

![](_attachments/intro-ml-python-pp145-223/f4ef02d9997bc3751bb384da47a8d820e01ffb0c9133e335b64daa298a2938a8.jpg)  
Figure 3-23. Input data and three steps of the $k$ -means algorithm

Cluster centers are shown as triangles, while data points are shown as circles. Colors indicate cluster membership. We specified that we are looking for three clusters, so the algorithm was initialized by declaring three data points randomly as cluster cen‐ ters (see “Initialization”). Then the iterative algorithm starts. First, each data point is assigned to the cluster center it is closest to (see “Assign Points $\left( 1 \right) ^ { \dag } ,$ ). Next, the cluster centers are updated to be the mean of the assigned points (see “Recompute Centers (1)”). Then the process is repeated two more times. After the third iteration, the assignment of points to cluster centers remained unchanged, so the algorithm stops.

Given new data points, $k$ -means will assign each to the closest cluster center. The next example (Figure 3-24) shows the boundaries of the cluster centers that were learned in Figure 3-23:

# In[48]:

mglearn.plots.plot_kmeans_boundaries()

![](_attachments/intro-ml-python-pp145-223/5c1d98899a394ffdbb55fa29c20f01a387f0edd5ebe7d9e5f7cc1724c1909f41.jpg)  
Figure 3-24. Cluster centers and cluster boundaries found by the $k$ -means algorithm

Applying $k$ -means with scikit-learn is quite straightforward. Here, we apply it to the synthetic data that we used for the preceding plots. We instantiate the KMeans class, and set the number of clusters we are looking for.3 Then we call the fit method with the data:

# In[49]:

```python
from sklearnbourstimportmakeblobs from sklearn.cluster import KMeans 
```

```txt
generate synthetic two-dimensional data X, y = make_blobs(random_state=1) 
```

```txt
# build the clustering model
kmeans = KMeans(n_clusters=3)
kmeans.fit(X) 
```

During the algorithm, each training data point in X is assigned a cluster label. You can find these labels in the kmeans.labels_ attribute:

# In[50]:

print("Cluster memberships:\n{}".format(kmeans.labels_))

# Out[50]:

Cluster memberships:

```json
[1 2 2 2 0 0 0 2 1 1 2 2 0 1 0 0 0 1 2 2 0 2 0 1 2 0 0 1 1 0 1 1 0 1 2 0 2 2 0 0 1 2 2 0 0 1] 
```

As we asked for three clusters, the clusters are numbered 0 to 2.

You can also assign cluster labels to new points, using the predict method. Each new point is assigned to the closest cluster center when predicting, but the existing model is not changed. Running predict on the training set returns the same result as labels_:

# In[51]:

print(kmeans.predict(X))

# Out[51]:

```json
[1 2 2 2 0 0 0 2 1 1 2 2 0 1 0 0 0 1 2 2 0 2 0 1 2 0 0 1 1 0 1 1 0 1 2 0 2 2 0 0 1 1 2 2 0 0 1] 
```

You can see that clustering is somewhat similar to classification, in that each item gets a label. However, there is no ground truth, and consequently the labels themselves have no a priori meaning. Let’s go back to the example of clustering face images that we discussed before. It might be that the cluster 3 found by the algorithm contains only faces of your friend Bela. You can only know that after you look at the pictures, though, and the number 3 is arbitrary. The only information the algorithm gives you is that all faces labeled as 3 are similar.

For the clustering we just computed on the two-dimensional toy dataset, that means that we should not assign any significance to the fact that one group was labeled 0 and another one was labeled 1. Running the algorithm again might result in a differ‐ ent numbering of clusters because of the random nature of the initialization.

Here is a plot of this data again (Figure 3-25). The cluster centers are stored in the cluster_centers_ attribute, and we plot them as triangles:

# In[52]:

```python
mlearn.discrete_scan(X[;, 0], X[;, 1], kmeans.labels_, markers='o')  
mlearn.discrete_scan(  
kmeans.clustercenters[;, 0], kmeans.clustercenters[;, 1], [0, 1, 2],  
markers='^', markeredgewidth=2) 
```

![](_attachments/intro-ml-python-pp145-223/e47a0add71562a72091d8d2433f29295f214bb32ee2b88e0f2600bca746be70f.jpg)  
Figure 3-25. Cluster assignments and cluster centers found by $k$ -means with three clusters

We can also use more or fewer cluster centers (Figure 3-26):

In[53]:   
```python
fig, axes = plt.subplot(1, 2, figsize=(10, 5))  
# using two cluster centers:  
kmeans = KMeans(n_clusters=2)  
kmeans.fit(X)  
assignments = kmeans.labels_  
mlearn.discrete_scatter(X[:, 0], X[:, 1], assignments, ax=axes[0])  
# using five cluster centers:  
kmeans = KMeans(n_clusters=5)  
kmeans.fit(X)  
assignments = kmeans.labels_  
mlearn.discrete_scatter(X[:, 0], X[:, 1], assignments, ax=axes[1]) 
```

![](_attachments/intro-ml-python-pp145-223/2628595ff5d2dc6bb4c90edf6a350d0b04a87f1b7809f00d4133222e30611b12.jpg)

![](_attachments/intro-ml-python-pp145-223/dc607a2a3297af7cd0d8ef9890d5f94e1e20922752a3ec72c43d9db7e4858d46.jpg)  
Figure 3-26. Cluster assignments found by $k$ -means using two clusters (left) and five clusters (right)

# Failure cases of k-means

Even if you know the “right” number of clusters for a given dataset, $k$ -means might not always be able to recover them. Each cluster is defined solely by its center, which means that each cluster is a convex shape. As a result of this, $k$ -means can only cap‐ ture relatively simple shapes. $k$ -means also assumes that all clusters have the same “diameter” in some sense; it always draws the boundary between clusters to be exactly in the middle between the cluster centers. That can sometimes lead to surprising results, as shown in Figure 3-27:

# In[54]:

```python
X_varied, y_varied = makeblobs(n_samples=200, cluster_std=[1.0, 2.5, 0.5], random_state=170)  
y_pred = KMeans(n_clusters=3, random_state=0).fit.predict(X_varied)  
mlearn.discrete_scatter(X_varied[:, :, 0], X_varied[:, :, 1], y_pred)  
plt.legend(['cluster 0", "cluster 1", "cluster 2"], loc='best')  
plt.xlabel("Feature 0")  
pltylabel("Feature 1") 
```

![](_attachments/intro-ml-python-pp145-223/a49ad51bf5fbe7fc34d1645593b561506d4f12ae0be6b2f384721e4efd2acd0d.jpg)  
Figure 3-27. Cluster assignments found by $k$ -means when clusters have different densities

One might have expected the dense region in the lower left to be the first cluster, the dense region in the upper right to be the second, and the less dense region in the cen‐ ter to be the third. Instead, both cluster 0 and cluster 1 have some points that are far away from all the other points in these clusters that “reach” toward the center.

$k$ -means also assumes that all directions are equally important for each cluster. The following plot (Figure 3-28) shows a two-dimensional dataset where there are three clearly separated parts in the data. However, these groups are stretched toward the diagonal. As $k$ -means only considers the distance to the nearest cluster center, it can’t handle this kind of data:

# In[55]:

```python
# generate some random cluster data  
X, y = make_blobs(random_state=170, n_samples=600)  
rng = np.random.RandomState(74)  
# transform the data to be stretched  
transformation =rng.normal(size=(2,2))  
X = np.dot(X, transformation) 
```

```txt
# cluster the data into three clusters
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
y_pred = kmeans.predict(X)
# plot the cluster assignments and cluster centers
pltscatter(X[:, 0], X[:, 1], c=y_pred, cmap=mlearn.cm3)
plt scatter(kmeans.clustercenters_[:, 0], kmeans.clustercenters_[:, 1], marker='^', c=[0, 1, 2], s=100, linewidth=2, cmap=mlearn.cm3)
plt.xlabel("Feature0")
pltylabel("Feature1") 
```

![](_attachments/intro-ml-python-pp145-223/f8da37e749aceaea8fe98a0ef38e612740bf9194b69a9d8a800fb2c5e2923dc8.jpg)  
Figure 3-28. $k$ -means fails to identify nonspherical clusters

$k$ -means also performs poorly if the clusters have more complex shapes, like the two_moons data we encountered in Chapter 2 (see Figure 3-29):

# In[56]:

```python
generate synthetic two moons data (with less noise this time) from sklearn.datasets import make moons  
X, y = make moons(n_samples=200, noise=0.05, random_state=0) 
```

```txt
cluster the data into two clusters  
kmeans = KMeans(n_clusters=2)  
kmeans.fit(X)  
y_pred = kmeans.predict(X) 
```

```python
plot the cluster assignments and cluster centers  
pltscatter(X(:, 0], X(:, 1], c=y_pred, cmap=mglearn.cm2, s=60)  
pltscatter(kmeans.clustercenters_[:, 0], kmeans.clustercenters_[:, 1], marker='^', c=[mglearn.cm2(0), mglearn.cm2(1)], s=100, linewidth=2)  
plt.xlabel("Feature0")  
pltylabel("Feature1") 
```

![](_attachments/intro-ml-python-pp145-223/9094d388dc75610ba7af1d738da7d91cf778b46fb24e487b05982a544c004c26.jpg)  
Figure 3-29. $k$ -means fails to identify clusters with complex shapes

Here, we would hope that the clustering algorithm can discover the two half-moon shapes. However, this is not possible using the $k$ -means algorithm.

# Vector quantization, or seeing k-means as decomposition

Even though $k$ -means is a clustering algorithm, there are interesting parallels between $k$ -means and the decomposition methods like PCA and NMF that we discussed ear‐ lier. You might remember that PCA tries to find directions of maximum variance in the data, while NMF tries to find additive components, which often correspond to “extremes” or “parts” of the data (see Figure 3-13). Both methods tried to express the data points as a sum over some components. $k$ -means, on the other hand, tries to rep‐ resent each data point using a cluster center. You can think of that as each point being represented using only a single component, which is given by the cluster center. This view of $k$ -means as a decomposition method, where each point is represented using a single component, is called vector quantization.

Let’s do a side-by-side comparison of PCA, NMF, and $k$ -means, showing the compo‐ nents extracted (Figure 3-30), as well as reconstructions of faces from the test set using 100 components (Figure 3-31). For $k$ -means, the reconstruction is the closest cluster center found on the training set:

In[57]:   
In[58]:   
```python
X_train, X_test, y_train, y_test = train_test_split( X_people, y_people, stratify=y_people, random_state=0)  
nmf = NMF(n_components=100, random_state=0)  
nmf.fit(X_train)  
 PCA = PCA(n_components=100, random_state=0)  
PCA.fit(X_train)  
kmeans = KMeans(n_clusters=100, random_state=0)  
kmeans.fit(X_train)  
X_reconstructed_pca = PCA.inverse_transform(pca.transform(X_test))  
X_reconstructed_kmeans = kmeans.clustercenters_[kmeans.predict(X_test)]  
X_reconstructed_nmf = np.dot(nmf.transform(X_test), nmf_components_） 
```

```python
fig, axes = plt.subplot(3, 5, figsize=(8, 8), subplot_kw={'xticks': (), 'yticks': ()})  
fig.suptitle("Extracted Components")  
for ax, comp_kmeans, comp_pca, comp_nmf in zip(ax.T, kmeans.clustercenters_, PCA_components_, nmf_components_):ax[0].imshow(comp_kmeans.reshape(image_shape))ax[1].imshow(comp_pca.reshape(image_shape), cmap='viridis')ax[2].imshow(comp_nmfreshape(image_shape))  
axes[0, 0].set_ylabel("kmeans")  
axes[1, 0].set_ylabel("pca")  
axes[2, 0].set_ylabel("nmf")  
fig, axes = plt.subplot(4, 5, subplot_kw={'xticks': (), 'yticks': ()},figsize=(8, 8))  
fig.suptitle("Reconstructions")  
for ax, orig, rec_kmeans, rec_pca, rec_nmf in zip(ax.T, X_test, X_reconstructed_kmeans, X_reconstructed_pca, X_reconstructed_nmf):ax[0].imshow(orig.reshape(image_shape))ax[1].imshow(rec_kmeans.reshape(image_shape))ax[2].imshow(rec_pca.reshape(image_shape))ax[3].imshow(rec_nmfreshape(image_shape))  
axes[0, 0].set_ylabel("original")  
axes[1, 0].set_ylabel("kmeans")  
axes[2, 0].set_ylabel("pca")  
axes[3, 0].set_ylabel("nmf") 
```

# Extracted Components

![](_attachments/intro-ml-python-pp145-223/02ee81548124e381afe96ab8d0e912cfdc5736e658fa1ceb71e85f46fe839c51.jpg)  
Figure 3-30. Comparing $k$ -means cluster centers to components found by PCA and NMF

# Reconstructions

![](_attachments/intro-ml-python-pp145-223/f1778f3e1a49debb488971d44b40dcf19d759dec5670c2d6f69cf2c011383bfd.jpg)  
Figure 3-31. Comparing image reconstructions using $k$ -means, PCA, and NMF with 100 components (or cluster centers)— $k$ -means uses only a single cluster center per image

An interesting aspect of vector quantization using $k$ -means is that we can use many more clusters than input dimensions to encode our data. Let’s go back to the two_moons data. Using PCA or NMF, there is nothing much we can do to this data, as it lives in only two dimensions. Reducing it to one dimension with PCA or NMF would completely destroy the structure of the data. But we can find a more expressive representation with $k$ -means, by using more cluster centers (see Figure 3-32):

In[59]:   
```python
X, y = make_moons(n_samples=200, noise=0.05, random_state=0)  
kmeans = KMeans(n_clusters=10, random_state=0)  
kmeans.fit(X)  
y_pred = kmeans.predict(X)  
pltscatter(X(:, 0], X[:, 1], c=y_pred, s=60, cmap='Paired')  
pltscatter(kmeans.clustercenters_[:, 0], kmeans.clustercenters_[:, 1], s=60, marker='^', c=range(kmeans.n_clusters), linewidth=2, cmap='Paired')  
plt.xlabel("Feature0")  
pltylabel("Feature1")  
print("Cluster memberships:\n").format(y_pred)) 
```

Out[59]:   
```txt
Cluster memberships:  
[9 2 5 4 2 7 9 6 9 6 1 0 2 6 1 9 3 0 3 1 7 6 8 6 8 5 2 7 5 8 9 8 6 5 3 7 0  
9 4 5 0 1 3 5 2 8 9 1 5 6 1 0 7 4 6 3 3 6 3 8 0 4 2 9 6 4 8 2 8 4 0 4 0 5  
6 4 5 9 3 0 7 8 0 7 5 8 9 8 0 7 3 9 7 1 7 2 2 0 4 5 6 7 8 9 4 5 4 1 2 3 1  
8 8 4 9 2 3 7 0 9 9 1 5 8 5 1 9 5 6 7 9 1 4 0 6 2 6 4 7 9 5 5 3 8 1 9 5 6  
3 5 0 2 9 3 0 8 6 0 3 3 5 6 3 2 0 2 3 0 2 6 3 4 4 1 5 6 7 1 1 3 2 4 7 2 7  
386414399517582] 
```

![](_attachments/intro-ml-python-pp145-223/01db50a6fd7f9cf8bc5ec11bdb1f54ceb801e3700a47270d33d0672d9d616e9b.jpg)  
Figure 3-32. Using many $k$ -means clusters to cover the variation in a complex dataset

We used 10 cluster centers, which means each point is now assigned a number between 0 and 9. We can see this as the data being represented using 10 components (that is, we have 10 new features), with all features being 0, apart from the one that represents the cluster center the point is assigned to. Using this 10-dimensional repre‐ sentation, it would now be possible to separate the two half-moon shapes using a lin‐ ear model, which would not have been possible using the original two features. It is also possible to get an even more expressive representation of the data by using the distances to each of the cluster centers as features. This can be accomplished using the transform method of kmeans:

# In[60]:

```python
distance_features = kmeans.transform(X)  
print("Distance feature shape: {}.format(distance_features.shape))  
print("Distance features:\n").format(distance_features)) 
```

# Out[60]:

```latex
Distance feature shape: (200, 10)  
Distance features:  
[ \begin{bmatrix} 0.922 & 1.466 & 1.14 & \ldots, & 1.166 & 1.039 & 0.233 \\ [1.142 & 2.517 & 0.12 & \ldots, & 0.707 & 2.204 & 0.983 \\ [0.788 & 0.774 & 1.749 & \ldots, & 1.971 & 0.716 & 0.944 \\ \ldots, \\ [0.446 & 1.106 & 1.49 & \ldots, & 1.791 & 1.032 & 0.812 \\ [1.39 & 0.798 & 1.981 & \ldots, & 1.978 & 0.239 & 1.058 \\ [1.149 & 2.454 & 0.045 & \ldots, & 0.572 & 2.113 & 0.882] \end{bmatrix} ] 
```

$k$ -means is a very popular algorithm for clustering, not only because it is relatively easy to understand and implement, but also because it runs relatively quickly. $k$ - means scales easily to large datasets, and scikit-learn even includes a more scalable variant in the MiniBatchKMeans class, which can handle very large datasets.

One of the drawbacks of $k$ -means is that it relies on a random initialization, which means the outcome of the algorithm depends on a random seed. By default, scikitlearn runs the algorithm 10 times with 10 different random initializations, and returns the best result.4 Further downsides of $k$ -means are the relatively restrictive assumptions made on the shape of clusters, and the requirement to specify the num‐ ber of clusters you are looking for (which might not be known in a real-world application).

Next, we will look at two more clustering algorithms that improve upon these proper‐ ties in some ways.

# Agglomerative Clustering

Agglomerative clustering refers to a collection of clustering algorithms that all build upon the same principles: the algorithm starts by declaring each point its own cluster, and then merges the two most similar clusters until some stopping criterion is satis‐ fied. The stopping criterion implemented in scikit-learn is the number of clusters, so similar clusters are merged until only the specified number of clusters are left. There are several linkage criteria that specify how exactly the “most similar cluster” is measured. This measure is always defined between two existing clusters.

The following three choices are implemented in scikit-learn:

ward

The default choice, ward picks the two clusters to merge such that the variance within all clusters increases the least. This often leads to clusters that are rela‐ tively equally sized.

average

average linkage merges the two clusters that have the smallest average distance between all their points.

complete

complete linkage (also known as maximum linkage) merges the two clusters that have the smallest maximum distance between their points.

ward works on most datasets, and we will use it in our examples. If the clusters have very dissimilar numbers of members (if one is much bigger than all the others, for example), average or complete might work better.

The following plot (Figure 3-33) illustrates the progression of agglomerative cluster‐ ing on a two-dimensional dataset, looking for three clusters:

In[61]:

mglearn.plots.plot_agglomerative_algorithm()

![](_attachments/intro-ml-python-pp145-223/3403fea31bc72b3c7f7b059319ce6c863b2c6c5816ef722d9bc29386dc128fb3.jpg)  
Figure 3-33. Agglomerative clustering iteratively joins the two closest clusters

Initially, each point is its own cluster. Then, in each step, the two clusters that are closest are merged. In the first four steps, two single-point clusters are picked and these are joined into two-point clusters. In step 5, one of the two-point clusters is extended to a third point, and so on. In step 9, there are only three clusters remain‐ ing. As we specified that we are looking for three clusters, the algorithm then stops.

Let’s have a look at how agglomerative clustering performs on the simple threecluster data we used here. Because of the way the algorithm works, agglomerative clustering cannot make predictions for new data points. Therefore, Agglomerative Clustering has no predict method. To build the model and get the cluster member‐ ships on the training set, use the fit_predict method instead.5 The result is shown in Figure 3-34:

# In[62]:

```python
from sklearn.cluster import AgglomerativeClustering  
X, y = makeblobs(random_state=1)  
agg = AgglomerativeClustering(n_clusters=3)  
assignment = agg.fit.predict(X)  
mlearn.discrete_scatter(X[:, 0], X[:, 1], assignment)  
plt.xlabel("Feature 0")  
pltylabel("Feature 1") 
```

![](_attachments/intro-ml-python-pp145-223/c3f95f260f4c9cb186f2a6ebaa18699fa9cdeb511ebabb94731cc2880133985c.jpg)  
Figure 3-34. Cluster assignment using agglomerative clustering with three clusters

As expected, the algorithm recovers the clustering perfectly. While the scikit-learn implementation of agglomerative clustering requires you to specify the number of clusters you want the algorithm to find, agglomerative clustering methods provide some help with choosing the right number, which we will discuss next.

# Hierarchical clustering and dendrograms

Agglomerative clustering produces what is known as a hierarchical clustering. The clustering proceeds iteratively, and every point makes a journey from being a single point cluster to belonging to some final cluster. Each intermediate step provides a clustering of the data (with a different number of clusters). It is sometimes helpful to look at all possible clusterings jointly. The next example (Figure 3-35) shows an over‐ lay of all the possible clusterings shown in Figure 3-33, providing some insight into how each cluster breaks up into smaller clusters:

# In[63]:

mglearn.plots.plot_agglomerative()

![](_attachments/intro-ml-python-pp145-223/e353086c6e142da984be0206adbe9ca1628ec87270dd30c1614c1ff65d93c730.jpg)  
Figure 3-35. Hierarchical cluster assignment (shown as lines) generated with agglomera‐ tive clustering, with numbered data points (cf. Figure 3-36)

While this visualization provides a very detailed view of the hierarchical clustering, it relies on the two-dimensional nature of the data and therefore cannot be used on datasets that have more than two features. There is, however, another tool to visualize hierarchical clustering, called a dendrogram, that can handle multidimensional datasets.

Unfortunately, scikit-learn currently does not have the functionality to draw den‐ drograms. However, you can generate them easily using SciPy. The SciPy clustering algorithms have a slightly different interface to the scikit-learn clustering algo‐ rithms. SciPy provides a function that takes a data array X and computes a linkage array, which encodes hierarchical cluster similarities. We can then feed this linkage array into the scipy dendrogram function to plot the dendrogram (Figure 3-36):

# In[64]:

# Import the dendrogram function and the ward clustering function from SciPy from scipy.cluster.hierarchy import dendrogram, ward

```txt
X, y = makeblobs(random_state=0, n_samples=12)  
# Apply the ward clustering to the data array X  
# The SciPy ward function returns an array that specifies the distances  
# bridged when performing agglomerative clustering  
linkage_array = ward(X) 
```

```txt
Now we plot the dendrogram for the linkage_array containing the distances # between clusters dendrogram(linkage_array) 
```

```python
Mark the cuts in the tree that signify two or three clusters  
ax = plt.gca()  
bounds = ax.get_xbound()  
ax.plot(bounds, [7.25, 7.25], ['--', c='k')  
ax.plot(bounds, [4, 4], ['--', c='k')  
ax.text(bounds[1], 7.25, 'two clusters', va='center', fontdict={'size': 15})  
ax.text(bounds[1], 4, 'three clusters', va='center', fontdict={'size': 15})  
plt.xlabel("Sample index")  
pltylabel("Cluster distance") 
```

![](_attachments/intro-ml-python-pp145-223/56f0b9e42d0a685e8b37123a9baca67a92718cb0d0ac3d6815f3a752c7201701.jpg)  
Figure 3-36. Dendrogram of the clustering shown in Figure 3-35 with lines indicating splits into two and three clusters

The dendrogram shows data points as points on the bottom (numbered from 0 to 11). Then, a tree is plotted with these points (representing single-point clusters) as the leaves, and a new node parent is added for each two clusters that are joined.

Reading from bottom to top, the data points 1 and 4 are joined first (as you could see in Figure 3-33). Next, points 6 and 9 are joined into a cluster, and so on. At the top level, there are two branches, one consisting of points 11, 0, 5, 10, 7, 6, and 9, and the other consisting of points 1, 4, 3, 2, and 8. These correspond to the two largest clus‐ ters in the lefthand side of the plot.

The y-axis in the dendrogram doesn’t just specify when in the agglomerative algo‐ rithm two clusters get merged. The length of each branch also shows how far apart the merged clusters are. The longest branches in this dendrogram are the three lines that are marked by the dashed line labeled “three clusters.” That these are the longest branches indicates that going from three to two clusters meant merging some very far-apart points. We see this again at the top of the chart, where merging the two remaining clusters into a single cluster again bridges a relatively large distance.

Unfortunately, agglomerative clustering still fails at separating complex shapes like the two_moons dataset. But the same is not true for the next algorithm we will look at, DBSCAN.

# DBSCAN

Another very useful clustering algorithm is DBSCAN (which stands for “densitybased spatial clustering of applications with noise”). The main benefits of DBSCAN are that it does not require the user to set the number of clusters a priori, it can cap‐ ture clusters of complex shapes, and it can identify points that are not part of any cluster. DBSCAN is somewhat slower than agglomerative clustering and $k$ -means, but still scales to relatively large datasets.

DBSCAN works by identifying points that are in “crowded” regions of the feature space, where many data points are close together. These regions are referred to as dense regions in feature space. The idea behind DBSCAN is that clusters form dense regions of data, separated by regions that are relatively empty.

Points that are within a dense region are called core samples (or core points), and they are defined as follows. There are two parameters in DBSCAN: min_samples and eps. If there are at least min_samples many data points within a distance of eps to a given data point, that data point is classified as a core sample. Core samples that are closer to each other than the distance eps are put into the same cluster by DBSCAN.

The algorithm works by picking an arbitrary point to start with. It then finds all points with distance eps or less from that point. If there are less than min_samples points within distance eps of the starting point, this point is labeled as noise, meaning that it doesn’t belong to any cluster. If there are more than min_samples points within a distance of eps, the point is labeled a core sample and assigned a new cluster label. Then, all neighbors (within eps) of the point are visited. If they have not been assigned a cluster yet, they are assigned the new cluster label that was just created. If they are core samples, their neighbors are visited in turn, and so on. The cluster grows until there are no more core samples within distance eps of the cluster. Then another point that hasn’t yet been visited is picked, and the same procedure is repeated.

In the end, there are three kinds of points: core points, points that are within distance eps of core points (called boundary points), and noise. When the DBSCAN algorithm is run on a particular dataset multiple times, the clustering of the core points is always the same, and the same points will always be labeled as noise. However, a boundary point might be neighbor to core samples of more than one cluster. Therefore, the cluster membership of boundary points depends on the order in which points are vis‐ ited. Usually there are only few boundary points, and this slight dependence on the order of points is not important.

Let’s apply DBSCAN on the synthetic dataset we used to demonstrate agglomerative clustering. Like agglomerative clustering, DBSCAN does not allow predictions on new test data, so we will use the fit_predict method to perform clustering and return the cluster labels in one step:

In[65]:   
```python
from sklearn.cluster import DBSCAN  
X, y = makeblobs(random_state=0, n_samples=12)  
dbscan = DBSCAN()  
clusters = dbscan.fit_prediction(X)  
print("Cluster memberships:\n").format(clusters)) 
```

Out[65]:   
```txt
Cluster memberships: [-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1] 
```

As you can see, all data points were assigned the label -1, which stands for noise. This is a consequence of the default parameter settings for eps and min_samples, which are not tuned for small toy datasets. The cluster assignments for different values of min_samples and eps are shown below, and visualized in Figure 3-37:

In[66]:   
Out[66]:   
```javascript
mlearnplots.plot_dbscan() 
```

```yaml
min_samples: 2 eps: 1.000000 cluster: [-1 0 0 -1 0 -1 1 1 0 1 -1 -1]  
min_samples: 2 eps: 1.500000 cluster: [0 1 1 1 1 0 2 2 1 2 2 0]  
min_samples: 2 eps: 2.000000 cluster: [0 1 1 1 1 0 0 0 1 0 0 0]  
min_samples: 2 eps: 3.000000 cluster: [0 0 0 0 0 0 0 0 0 0 0]  
min_samples: 3 eps: 1.000000 cluster: [-1 0 0 -1 0 -1 1 1 0 1 -1 -1]  
min_samples: 3 eps: 1.500000 cluster: [0 1 1 1 1 0 2 2 1 2 2 0]  
min_samples: 3 eps: 2.000000 cluster: [0 1 1 1 1 0 0 0 1 0 0 0]  
min_samples: 3 eps: 3.000000 cluster: [0 0 0 0 0 0 0 0 0 0 0]  
min_samples: 5 eps: 1.000000 cluster: [-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1]  
min_samples: 5 eps: 1.500000 cluster: [-1 0 0 0 0 -1 -1 -1 -1 0 -1 -1 -1 -1]  
min_samples: 5 eps: 2.000000 cluster: [-1 0 0 0 0 -1 -1 -1 -1 0 -1 -1 -1 -1]  
min_samples: 5 eps: 3.000000 cluster: [0 0 0 0 0 0 0 0 0 0] 
```

![](_attachments/intro-ml-python-pp145-223/1528167e6b84789946e8e88a8279a06fd2466af03530068fbe010aedff6396ca.jpg)

![](_attachments/intro-ml-python-pp145-223/5cd5dbc6ac5773bf855008c50a196fd0b9d7777faa5d0b6fbc8d46a393cb225f.jpg)

![](_attachments/intro-ml-python-pp145-223/8cb5f5a207d1042f519fd89ca9c913203d79f9bd0baf2716aaf2f86d267712da.jpg)

![](_attachments/intro-ml-python-pp145-223/9aadcb69ec5165a1646a508d6c3365a72d4509b5fdddb2d1b95df9153907375f.jpg)

![](_attachments/intro-ml-python-pp145-223/0fc4c0630f4af528ea6c35bc4a1865fb2954cf57c21e36d809356864219ed1de.jpg)

![](_attachments/intro-ml-python-pp145-223/3f95165408ea0b82a196a73c73a2085cd1a2c2cc6a56fed4fe1ef9ec51a32a85.jpg)

![](_attachments/intro-ml-python-pp145-223/d44ff73c2088d7cbea68c7fcaaf8b479806af346ac701ac2d2564b4c6559a9cb.jpg)

![](_attachments/intro-ml-python-pp145-223/6b7813e4c2d52b172d30ff1aa07cb77b435d4cfbfe2cd97d379cb604c01be2bc.jpg)

![](_attachments/intro-ml-python-pp145-223/78af4e0d585be537e4442c327340951ac6c7214a0480a082be4f3d5b71023b34.jpg)

![](_attachments/intro-ml-python-pp145-223/e59dd3e6333a925c64e873baf9cf3fa5fef2283f227620dc890532098fbfbf59.jpg)

![](_attachments/intro-ml-python-pp145-223/bf7437cb9129713f3cd9d6978eae761833a0cb49333bfc54bbbb604d2b0202ef.jpg)

![](_attachments/intro-ml-python-pp145-223/328ecc12a454e31451c2cbc709da051416927f1148741959f4bec315830d38db.jpg)  
Figure 3-37. Cluster assignments found by DBSCAN with varying settings for the min_samples and eps parameters

In this plot, points that belong to clusters are solid, while the noise points are shown in white. Core samples are shown as large markers, while boundary points are dis‐ played as smaller markers. Increasing eps (going from left to right in the figure) means that more points will be included in a cluster. This makes clusters grow, but might also lead to multiple clusters joining into one. Increasing min_samples (going from top to bottom in the figure) means that fewer points will be core points, and more points will be labeled as noise.

The parameter eps is somewhat more important, as it determines what it means for points to be “close.” Setting eps to be very small will mean that no points are core samples, and may lead to all points being labeled as noise. Setting eps to be very large will result in all points forming a single cluster.

The min_samples setting mostly determines whether points in less dense regions will be labeled as outliers or as their own clusters. If you decrease min_samples, anything that would have been a cluster with less than min_samples many samples will now be labeled as noise. min_samples therefore determines the minimum cluster size. You can see this very clearly in Figure 3-37, when going from min_samples $: = 3$ to min_sam ples=5 with $\mathsf { e p s } { = } 1 . 5$ . With min_samples $^ { = 3 }$ , there are three clusters: one of four

points, one of five points, and one of three points. Using min_samples ${ } _ { , = 5 }$ , the two smaller clusters (with three and four points) are now labeled as noise, and only the cluster with five samples remains.

While DBSCAN doesn’t require setting the number of clusters explicitly, setting eps implicitly controls how many clusters will be found. Finding a good setting for eps is sometimes easier after scaling the data using StandardScaler or MinMaxScaler, as using these scaling techniques will ensure that all features have similar ranges.

Figure 3-38 shows the result of running DBSCAN on the two_moons dataset. The algorithm actually finds the two half-circles and separates them using the default settings:

In[67]:   
```python
X, y = make_moons(n_samples=200, noise=0.05, random_state=0)  
# rescale the data to zero mean and unit variance  
scalar = StandardScaler()  
scalar.fit(X)  
XScaled = scorer.transform(X)  
dbscan = DBSCAN()  
clusters = dbscan.fit_prediction(Xscaled)  
# plot the cluster assignments  
plt scatter(Xscaled[ :, 0], Xscaled[ :, 1], c=clusters, cmap=mlearn.cm2, s=60)  
plt.xlabel("Feature 0")  
pltylabel("Feature 1") 
```

As the algorithm produced the desired number of clusters (two), the parameter set‐ tings seem to work well. If we decrease eps to 0.2 (from the default of 0.5), we will get eight clusters, which is clearly too many. Increasing eps to 0.7 results in a single cluster.

When using DBSCAN, you need to be careful about handling the returned cluster assignments. The use of -1 to indicate noise might result in unexpected effects when using the cluster labels to index another array.

![](_attachments/intro-ml-python-pp145-223/192a8d48fd13a9d4a95299d2054c8ae74791449a476652fe2f531ceb006b7835.jpg)  
Figure 3-38. Cluster assignment found by DBSCAN using the default value of eps=0.5

# Comparing and Evaluating Clustering Algorithms

One of the challenges in applying clustering algorithms is that it is very hard to assess how well an algorithm worked, and to compare outcomes between different algo‐ rithms. After talking about the algorithms behind $k$ -means, agglomerative clustering, and DBSCAN, we will now compare them on some real-world datasets.

# Evaluating clustering with ground truth

There are metrics that can be used to assess the outcome of a clustering algorithm relative to a ground truth clustering, the most important ones being the adjusted rand index (ARI) and normalized mutual information (NMI), which both provide a quanti‐ tative measure between 0 and 1.

Here, we compare the $k$ -means, agglomerative clustering, and DBSCAN algorithms using ARI. We also include what it looks like when we randomly assign points to two clusters for comparison (see Figure 3-39):

In[68]:   
```python
from sklearn.metrics.cluster import adjusted_rand_score  
X, y = make moons(n_samples=200, noise=0.05, random_state=0)  
# rescale the data to zero mean and unit variance  
scalar = StandardScaler()  
scalar.fit(X)  
X_scaling =Scaler.transform(X)  
fig, axes = plt.subplot(1, 4, figsize=(15, 3),  
subplot_kw={'xticks':'('yticks':''))  
# make a list of algorithms to use  
algorithms = [KMeans(n_clusters=2), AgglomerativeClustering(n_clusters=2),  
DBSCAN())  
# create a random cluster assignment for reference  
random_state = np.random.RandomState(seed=0)  
randomClusters = random_state.randint(low=0, high=2, size=len(X))  
# plot random assignment  
axes[0].scatter(XScaled(:, :, 0], XScaled(:, 1], c=randomclusters,  
cmap=mlearn.cm3, s=60)  
axes[0].setTitle("Random assignment - ARI: {:.2f}".format(  
adjusted_rand_score(y, randomClusters)))  
for ax, algorithm in zip(axs[1]:, algorithms):  
    # plot the cluster assignments and cluster centers  
    clusters = algorithm.fit_prediction(Xscaled)  
    ax.scatter(XScaled(:, :, 0], XScaled(:, 1], c=clusters,  
cmap=mlearn.cm3, s=60)  
    ax.set_title("{ } - ARI: {:.2f}".format(algorithm.__class__._name__,  
adjusted_rand_score(y, clusters))) 
```

![](_attachments/intro-ml-python-pp145-223/040f1a8439c4ab8457afb8b5a514bf9548090c1f4b55a216d711735a1c1a66d4.jpg)  
Random assignment - ARI: 0.00

![](_attachments/intro-ml-python-pp145-223/98bcfbb6fd7ba98c1bc6da0ab9b6ace7e35770e47f096f833aa3cb6e86b7fcd3.jpg)  
KMeans - ARI: 0.50

![](_attachments/intro-ml-python-pp145-223/898587a56cab4fa99b746e495fd330036e1c4bc2395d626518f0002ac25cf44d.jpg)  
AgglomerativeClustering - ARI: 0.61

![](_attachments/intro-ml-python-pp145-223/474acd31bc4adfbdc85e7f811582051eddc157db673815e283106139090e3879.jpg)  
DBSCAN - ARI: 1.00   
Figure 3-39. Comparing random assignment, $k$ -means, agglomerative clustering, and DBSCAN on the two_moons dataset using the supervised ARI score

The adjusted rand index provides intuitive results, with a random cluster assignment having a score of 0 and DBSCAN (which recovers the desired clustering perfectly) having a score of 1.

A common mistake when evaluating clustering in this way is to use accuracy_score instead of adjusted_rand_score, normalized_mutual_info_score, or some other clustering metric. The problem in using accuracy is that it requires the assigned clus‐ ter labels to exactly match the ground truth. However, the cluster labels themselves are meaningless—the only thing that matters is which points are in the same cluster:

# In[69]:

```python
from sklearn.metrics import accuracy_score
# these two labelings of points correspond to the same clustering
clusters1 = [0, 0, 1, 1, 0]
clusters2 = [1, 1, 0, 0, 1]
# accuracy is zero, as none of the labels are the same
print("Accuracy: {:.2f}".format(accuracy_score(clusters1, clusters2)))
# adjusted rand score is 1, as the clustering is exactly the same
print("ARI: {:.2f}".format(adjusted_rand_score(clusters1, clusters2))) 
```

# Out[69]:

```txt
Accuracy: 0.00  
ARI: 1.00 
```

# Evaluating clustering without ground truth

Although we have just shown one way to evaluate clustering algorithms, in practice, there is a big problem with using measures like ARI. When applying clustering algo‐ rithms, there is usually no ground truth to which to compare the results. If we knew the right clustering of the data, we could use this information to build a supervised model like a classifier. Therefore, using metrics like ARI and NMI usually only helps in developing algorithms, not in assessing success in an application.

There are scoring metrics for clustering that don’t require ground truth, like the sil‐ houette coefficient. However, these often don’t work well in practice. The silhouette score computes the compactness of a cluster, where higher is better, with a perfect score of 1. While compact clusters are good, compactness doesn’t allow for complex shapes.

Here is an example comparing the outcome of $k$ -means, agglomerative clustering, and DBSCAN on the two-moons dataset using the silhouette score (Figure 3-40):

# In[70]:

```python
from sklearn.metrics.cluster import silhouette_score  
X, y = make moons(n_samples=200, noise=0.05, random_state=0)  
# rescale the data to zero mean and unit variance  
scalar = StandardScaler()  
scalar.fit(X)  
X Sized = scalar.transform(X) 
```

fig,axes $=$ plt.subplot(1,4,figsize $\coloneqq$ (15,3), subplot_kw $\equiv$ ['xticks':(), 'yticks': ()])   
# create a random cluster assignment for reference   
random_state $=$ np.random.RandomState(seed $\coloneqq 0$ random_clusters $=$ random_state.randint(low $\coloneqq$ 0，high $= 2$ ，size $\coloneqq$ len(X))   
# plot random assignment   
axes[O].scatter(XScaled[：，0]，XScaled[：，1]，c=randomclusters, cmap=mlearn.cm3,s=60)   
axes[O].set_title("Random assignment:{.2f}".format( silhouette_score(Xscaled, randomClusters)))   
algorithms $=$ [KMeans(n_clusters $= 2$ )，AgglomerativeClustering(n_clusters $= 2$ ) DBSCAN()]   
for ax,algorithm in zip(axs[1:],algorithms): clusters $=$ algorithm.fit.predict(Xscaled) # plot the cluster assignments and cluster centers ax.scatter(XScaled[：，0]，XScaled[：，1]，c=clusters,cmap=mlearn.cm3, s=60) ax.set_title({}：{:.2f}".format(algorithm._class._.name_, silhouette_score(Xscaled,clusters)))

![](_attachments/intro-ml-python-pp145-223/d81d91d6c7db903f5eb2de94b56aadf47291750333c44943bf0bc33a6570291a.jpg)

![](_attachments/intro-ml-python-pp145-223/97f1c9473f85080b09e4fd0402f47d3cfbb4953a93180ddbce58df331bdc1b47.jpg)

![](_attachments/intro-ml-python-pp145-223/3e9f3991bb4fffd72e60a2ebbf2602e6923db3f113de324c335afbeb98680a3a.jpg)

![](_attachments/intro-ml-python-pp145-223/3ce8e95c5274bc7a7ea05075a3c3b83ec6668f42a1990174c097e483e9faa524.jpg)  
Figure 3-40. Comparing random assignment, $k$ -means, agglomerative clustering, and DBSCAN on the two_moons dataset using the unsupervised silhouette score—the more intuitive result of DBSCAN has a lower silhouette score than the assignments found by $k$ -means

As you can see, $k$ -means gets the highest silhouette score, even though we might pre‐ fer the result produced by DBSCAN. A slightly better strategy for evaluating clusters is using robustness-based clustering metrics. These run an algorithm after adding some noise to the data, or using different parameter settings, and compare the out‐ comes. The idea is that if many algorithm parameters and many perturbations of the data return the same result, it is likely to be trustworthy. Unfortunately, this strategy is not implemented in scikit-learn at the time of writing.

Even if we get a very robust clustering, or a very high silhouette score, we still don’t know if there is any semantic meaning in the clustering, or whether the clustering

reflects an aspect of the data that we are interested in. Let’s go back to the example of face images. We hope to find groups of similar faces—say, men and women, or old people and young people, or people with beards and without. Let’s say we cluster the data into two clusters, and all algorithms agree about which points should be clus‐ tered together. We still don’t know if the clusters that are found correspond in any way to the concepts we are interested in. It could be that they found side views versus front views, or pictures taken at night versus pictures taken during the day, or pic‐ tures taken with iPhones versus pictures taken with Android phones. The only way to know whether the clustering corresponds to anything we are interested in is to ana‐ lyze the clusters manually.

# Comparing algorithms on the faces dataset

Let’s apply the $k$ -means, DBSCAN, and agglomerative clustering algorithms to the Labeled Faces in the Wild dataset, and see if any of them find interesting structure. We will use the eigenface representation of the data, as produced by PCA(whiten=True), with 100 components:

# In[71]:

```python
extract eigenfaces from lfw data and transform data from sklearn.decomposition import PCA  
PCA = PCA(n_components=100, whiten=True, random_state=0)  
PCA.fit_transform(X_people)  
Xhoa = PCA.transform(X_people) 
```

We saw earlier that this is a more semantic representation of the face images than the raw pixels. It will also make computation faster. A good exercise would be for you to run the following experiments on the original data, without PCA, and see if you find similar clusters.

Analyzing the faces dataset with DBSCAN. We will start by applying DBSCAN, which we just discussed:

# In[72]:

```txt
apply DBSCAN with default parameters  
dbscan = DBSCAN()  
labels = dbscan.fit_prediction(X_pca)  
print("Unique labels: {}.format(np.unique(labels))) 
```

# Out[72]:

Unique labels: [-1]

We see that all the returned labels are $^ { - 1 }$ , so all of the data was labeled as “noise” by DBSCAN. There are two things we can change to help this: we can make eps higher, to expand the neighborhood of each point, and set min_samples lower, to consider smaller groups of points as clusters. Let’s try changing min_samples first:

In[73]:   
dbscan $=$ DBSCAN(min_samples $\coloneqq 3$ labels $=$ dbscan.fit_prediction(X_pca)   
print("Unique labels:{}"format(np.unique(labels)))

Out[73]:   
```txt
Unique labels: [-1] 
```

Even when considering groups of three points, everything is labeled as noise. So, we need to increase eps:

In[74]:   
```python
dbscan = DBSCAN(min_samples=3, eps=15)  
labels = dbscan.fit_prediction(X_pca)  
print("Unique labels: {}.format(np.unique(labels))) 
```

Out[74]:   
```txt
Unique labels: [-1 0] 
```

Using a much larger eps of 15, we get only a single cluster and noise points. We can use this result to find out what the “noise” looks like compared to the rest of the data. To understand better what’s happening, let’s look at how many points are noise, and how many points are inside the cluster:

In[75]:   
```python
# Count number of points in all clusters and noise.  
# bincount doesn't allow negative numbers, so we need to add 1.  
# The first number in the result corresponds to noise points.  
print("Number of points per cluster: {})".format(np.bicount(labels + 1))) 
```

Out[75]:   
```txt
Number of points per cluster: [ 27 2036] 
```

There are very few noise points—only 27—so we can look at all of them (see Figure 3-41):

In[76]:  
noise $=$ X_people[labelse=-1]   
fig,axes $=$ plt.subplots(3,9,subplot_kw={'xticks':()，'yticks'：（）}， figsize=(12，4))   
for image,ax in zip(noise,axes.ravel(): ax.imshow(image.reshape(image_shape)，vmin=0， vmax=1)

![](_attachments/intro-ml-python-pp145-223/a2ac44bb055c62b96d627957186847c4b8498f567af7325c9f43aca204c876bf.jpg)  
Figure 3-41. Samples from the faces dataset labeled as noise by DBSCAN

Comparing these images to the random sample of face images from Figure 3-7, we can guess why they were labeled as noise: the fifth image in the first row shows a per‐ son drinking from a glass, there are images of people wearing hats, and in the last image there’s a hand in front of the person’s face. The other images contain odd angles or crops that are too close or too wide.

This kind of analysis—trying to find “the odd one out”—is called outlier detection. If this was a real application, we might try to do a better job of cropping images, to get more homogeneous data. There is little we can do about people in photos sometimes wearing hats, drinking, or holding something in front of their faces, but it’s good to know that these are issues in the data that any algorithm we might apply needs to handle.

If we want to find more interesting clusters than just one large one, we need to set eps smaller, somewhere between 15 and 0.5 (the default). Let’s have a look at what differ‐ ent values of eps result in:

# In[77]:

```python
for eps in [1, 3, 5, 7, 9, 11, 13]:  
    print("\\neps={}" .format(eps))  
    dbscan = DBSCAN(eps=eps, min_samples=3)  
    labels = dbscan.fit_prediction(X_pca)  
    print("Clusters present: {}" .format(np.unique(labels)))  
    print("Cluster sizes: {}" .format(np.bincount.labels + 1))) 
```

# Out[78]:

```yaml
eps=1  
Clusters present: [-1]  
Cluster sizes: [2063]  
eps=3  
Clusters present: [-1]  
Cluster sizes: [2063] 
```

```txt
eps=5   
Clusters present: [-1]   
Cluster sizes: [2063]   
eps=7   
Clusters present: [-1 0 1 2 3 4 5 6 7 8 9 10 11 12] Cluster sizes: [2006 4 6 6 6 9 3 3 4 3 3 3 3 3 4]   
eps=9   
Clusters present: [-1 0 1 2]   
Cluster sizes: [1269 788 3 3]   
eps=11   
Clusters present: [-1 0]   
Cluster sizes: [430 1633]   
eps=13   
Clusters present: [-1 0]   
Cluster sizes: [112 1951] 
```

For low settings of eps, all points are labeled as noise. For $\tt e p s { = } 7$ , we get many noise points and many smaller clusters. For eps=9 we still get many noise points, but we get one big cluster and some smaller clusters. Starting from eps ${ \tt = } 1 1$ , we get only one large cluster and noise.

What is interesting to note is that there is never more than one large cluster. At most, there is one large cluster containing most of the points, and some smaller clusters. This indicates that there are not two or three different kinds of face images in the data that are very distinct, but rather that all images are more or less equally similar to (or dissimilar from) the rest.

The results for $\tt e p s { = } 7$ look most interesting, with many small clusters. We can investi‐ gate this clustering in more detail by visualizing all of the points in each of the 13 small clusters (Figure 3-42):

# In[78]:

dbscan $=$ DBSCAN(min_samples $\vDash$ 3,eps=7)   
labels $=$ dbscan.fit.predict(X_pca)   
for cluster in range(max(labels) + 1): mask $=$ labels $= =$ cluster n_images $=$ np.sum.labels) fig,axes $=$ plt.subplots(1,n_images,figsize=(n_images\*1.5,4), subplot_kw={'xticks':(), 'yticks':()}) for image, label, ax in zip(X_people[mask], y_people[mask], axes): ax.imshow(image.reshape(image_shape), vmin $\coloneqq$ 0,vmax $\coloneqq$ 1) ax.set_title(people.target_names[label].split([-1])

![](_attachments/intro-ml-python-pp145-223/484d24fb641f66b40789b4ac9aea71d5dc085cf18d17dd31822685249c36619f.jpg)  
Figure 3-42. Clusters found by DBSCAN with eps=7

Some of the clusters correspond to people with very distinct faces (within this data‐ set), such as Sharon or Koizumi. Within each cluster, the orientation of the face is also

quite fixed, as well as the facial expression. Some of the clusters contain faces of mul‐ tiple people, but they share a similar orientation and expression.

This concludes our analysis of the DBSCAN algorithm applied to the faces dataset. As you can see, we are doing a manual analysis here, different from the much more auto‐ matic search approach we could use for supervised learning based on $R ^ { 2 }$ score or accuracy.

Let’s move on to applying $k$ -means and agglomerative clustering.

Analyzing the faces dataset with k-means. We saw that it was not possible to create more than one big cluster using DBSCAN. Agglomerative clustering and $k$ -means are much more likely to create clusters of even size, but we do need to set a target num‐ ber of clusters. We could set the number of clusters to the known number of people in the dataset, though it is very unlikely that an unsupervised clustering algorithm will recover them. Instead, we can start with a low number of clusters, like 10, which might allow us to analyze each of the clusters:

# In[79]:

```python
# extract clusters with k-means
km = KMeans(n_clusters=10, random_state=0)
labels_km = km.fit.predict(X_pca)
print("Cluster sizes k-means: {}.format(np.bincount(labels_km))) 
```

# Out[79]:

```txt
Cluster sizes k-means: [269 128 170 186 386 222 237 64 253 148] 
```

As you can see, $k$ -means clustering partitioned the data into relatively similarly sized clusters from 64 to 386. This is quite different from the result of DBSCAN.

We can further analyze the outcome of $k$ -means by visualizing the cluster centers (Figure 3-43). As we clustered in the representation produced by PCA, we need to rotate the cluster centers back into the original space to visualize them, using pca.inverse_transform:

# In[80]:

fig,axes $=$ plt.subplot(2,5,subplot_kw={'xticks':（），'yticks':（）}, figsize=(12，4))   
for center,ax in zip(km.clustercenters_,axes.ravel(): ax.imshow(pca.inverse_transform(center).reshape(image_shape), vmin=0，vmax=1)

![](_attachments/intro-ml-python-pp145-223/ddb61c107ada56f909fc88184fc0dc2a553fe5e8fa6990aa8ed063c530ca9b58.jpg)

![](_attachments/intro-ml-python-pp145-223/e4213516e6b2fa2c1ea97483d9b90d242c5a672589ede95683b72df409ec6633.jpg)

![](_attachments/intro-ml-python-pp145-223/9f6cbd3d8a99e5972ef14d923855ee092650fb49561dfb09d4df61212111bb6c.jpg)

![](_attachments/intro-ml-python-pp145-223/5c5daa69e848ccc465b8863a02d27dc0604d500afc38181338cf9936ad053f0a.jpg)

![](_attachments/intro-ml-python-pp145-223/5beb6fc2a94daa4c28399c08374e434e5b15bbcde54296b9fe8777b1175a0448.jpg)

![](_attachments/intro-ml-python-pp145-223/92d22966d21a8545daefdea3103e8942697c51fbbcb4acbe242bcb37e2382bdc.jpg)

![](_attachments/intro-ml-python-pp145-223/13f5b1af55ccbeeda8c9fc5c72a5281b8ff4be46684bb74639f0fa7045946169.jpg)

![](_attachments/intro-ml-python-pp145-223/3cf35afb20e8028782a725b592dfbf84c60b67a6512a6b2a7eb27561f777304f.jpg)

![](_attachments/intro-ml-python-pp145-223/459e7c7db4cecc3af9b6918e49c46331578a88d4b71f140642c479c0f7cf6685.jpg)

![](_attachments/intro-ml-python-pp145-223/c129953645621115ce499a472d0407ad81d3c19998798c1ba9b983272fd9843b.jpg)  
Figure 3-43. Cluster centers found by $k$ -means when setting the number of clusters to 10

The cluster centers found by $k$ -means are very smooth versions of faces. This is not very surprising, given that each center is an average of 64 to 386 face images. Working with a reduced PCA representation adds to the smoothness of the images (compared to the faces reconstructed using 100 PCA dimensions in Figure 3-11). The clustering seems to pick up on different orientations of the face, different expressions (the third cluster center seems to show a smiling face), and the presence of shirt collars (see the second-to-last cluster center).

For a more detailed view, in Figure 3-44 we show for each cluster center the five most typical images in the cluster (the images assigned to the cluster that are closest to the cluster center) and the five most atypical images in the cluster (the images assigned to the cluster that are furthest from the cluster center):

# In[81]:

mglearn.plots.plot_kmeans_faces(km, pca, X_pca, X_people, y_people, people.target_names)

![](_attachments/intro-ml-python-pp145-223/81fb64d445f34fce45d2109638794c96305668e506441164e82b0aa98ee9c20a.jpg)  
Figure 3-44. Sample images for each cluster found by $k$ -means—the cluster centers are on the left, followed by the five closest points to each center and the five points that are assigned to the cluster but are furthest away from the center

Figure 3-44 confirms our intuition about smiling faces for the third cluster, and also the importance of orientation for the other clusters. The “atypical” points are not very similar to the cluster centers, though, and their assignment seems somewhat arbi‐ trary. This can be attributed to the fact that $k$ -means partitions all the data points and doesn’t have a concept of “noise” points, as DBSCAN does. Using a larger number of clusters, the algorithm could find finer distinctions. However, adding more clusters makes manual inspection even harder.

Analyzing the faces dataset with agglomerative clustering. Now, let’s look at the results of agglomerative clustering:

# In[82]:

extract clusters with ward agglomerative clustering agglomerative $=$ AgglomerativeClustering(n_clusters $\coloneqq 10$ labels_agg $=$ agglomerative.fit_prediction(X_pca) print("Cluster sizes agglomerative clustering: $\{\}$ ).format( np.bincount(labels_agg)))

# Out[82]:

Cluster sizes agglomerative clustering: [255 623 86 102 122 199 265 26 230 155]

Agglomerative clustering also produces relatively equally sized clusters, with cluster sizes between 26 and 623. These are more uneven than those produced by $k$ -means, but much more even than the ones produced by DBSCAN.

We can compute the ARI to measure whether the two partitions of the data given by agglomerative clustering and $k$ -means are similar:

# In[83]:

```txt
print("ARI: {:.2f}".format(adjusted_rand_score(labels_agg, labels_km))) 
```

# Out[83]:

ARI: 0.13

An ARI of only 0.13 means that the two clusterings labels_agg and labels_km have little in common. This is not very surprising, given the fact that points further away from the cluster centers seem to have little in common for $k$ -means.

Next, we might want to plot the dendrogram (Figure 3-45). We’ll limit the depth of the tree in the plot, as branching down to the individual 2,063 data points would result in an unreadably dense plot:

In[84]:   
linkage_array $=$ ward(X_pca) # now we plot the dendrogram for the linkage_array # containing the distances between clusters plt.figure(figsize=(20,5)) dendrogram(linkage_array,p=7,truncate_mode='level'，no_labels=True) pltxlabel("Sample index") pltylabel("Cluster distance")

Figure 3-45. Dendrogram of agglomerative clustering on the faces dataset

Creating 10 clusters, we cut across the tree at the very top, where there are 10 vertical lines. In the dendrogram for the toy data shown in Figure 3-36, you could see by the length of the branches that two or three clusters might capture the data appropriately. For the faces data, there doesn’t seem to be a very natural cutoff point. There are some branches that represent more distinct groups, but there doesn’t appear to be a particular number of clusters that is a good fit. This is not surprising, given the results of DBSCAN, which tried to cluster all points together.

Let’s visualize the 10 clusters, as we did for $k$ -means earlier (Figure 3-46). Note that there is no notion of cluster center in agglomerative clustering (though we could compute the mean), and we simply show the first couple of points in each cluster. We show the number of points in each cluster to the left of the first image:

In[85]:   
nclusters $= 10$ for cluster in range(n_clusters): mask $=$ labels_agg $\equiv =$ cluster fig,axes $=$ plt.subplots(1,10,subplot_kw={'xticks':（）,'yticks':（）}, figsize=(15，8)) axes[0].set_ylabel(np.sum(mask)) for image, label, asdf, ax in zip(X_people[mask], y_people[mask], labels_agg[mask],axes): ax.imshow(image.reshape(image_shape),vmin $= 0$ , vmax $= 1$ ) ax.set_title(people.target_names[label].split()[-1], fontdict $=$ {'fontsize':9})

![](_attachments/intro-ml-python-pp145-223/235c6b1627ce74d8f66d6da8a87cc86f2534fd4d60f937ca78b06f481b6e796b.jpg)  
Figure 3-46. Random images from the clusters generated by In[82]—each row corre‐ sponds to one cluster; the number to the left lists the number of images in each cluster

While some of the clusters seem to have a semantic theme, many of them are too large to be actually homogeneous. To get more homogeneous clusters, we can run the algorithm again, this time with 40 clusters, and pick out some of the clusters that are particularly interesting (Figure 3-47):

In[86]:   
```python
extract clusters with ward agglomerative clustering
agglomerative = AgglomerativeClustering(n_clusters=40)
labels_agg = agglomerative.fit_prediction(X_pca)
print("cluster sizes agglomerative clustering:.")
for cluster in [10, 13, 19, 22, 36]: # hand-picked "interesting" clusters
    mask = labels_agg == cluster
    fig, axes = plt.subplot(1, 15, subplot_kw={'xticks': (), 'yticks': ()}, figsize=(15, 8))
    cluster_size = np.sum(mask)
    axes[0].set_ylabel "#{}: {}
    format(cluster, cluster_size))
    for image, label, asdf, ax in zip(X_people[mask], y_people[mask],
                    labels_agg[mask], axes):
        ax.imshow(image.reshape(image_shape), vmax=0, vmax=1)
        ax.set_title(people.target_names[label].split()[-1],
                    fontdict={'fontsize': 9})
    for i in range(cluster_size, 15):
        axes[i].set Visible(False) 
```

Out[86]:   
```txt
cluster sizes agglomerative clustering:  
[58 80 79 40 222 50 55 78 172 28 26 34 14 11 60 66 152 27  
47 31 54 5 8 56 3 5 8 18 22 82 37 89 28 24 41 40  
21 10 113 69] 
```

![](_attachments/intro-ml-python-pp145-223/d3b6a55e9e811ca42faf3dffc907cd6f5172c04f0914ed45b8c1c245c8f2a1d0.jpg)

![](_attachments/intro-ml-python-pp145-223/92c1bb0c734cef4ec2e9358a218c3c6c2249e7f982f76428bb132394b961f4fb.jpg)

![](_attachments/intro-ml-python-pp145-223/2f5b56a78f56076a1eebaf17ec6bc86b27c44a1a65383b8bb816ed5d9bf69358.jpg)

![](_attachments/intro-ml-python-pp145-223/e54c17465013afd9b66d5fea432c7c1b01ab2bcc8c65bebb8f9e0c7f473bca6e.jpg)  
Figure 3-47. Images from selected clusters found by agglomerative clustering when set‐ ting the number of clusters to 40—the text to the left shows the index of the cluster and the total number of points in the cluster

Here, the clustering seems to have picked up on “dark skinned and smiling,” “collared shirt,” “smiling woman,” “Hussein,” and “high forehead.” We could also find these highly similar clusters using the dendrogram, if we did more a detailed analysis.

# Summary of Clustering Methods

This section has shown that applying and evaluating clustering is a highly qualitative procedure, and often most helpful in the exploratory phase of data analysis. We looked at three clustering algorithms: $k$ -means, DBSCAN, and agglomerative cluster‐ ing. All three have a way of controlling the granularity of clustering. $k$ -means and agglomerative clustering allow you to specify the number of desired clusters, while DBSCAN lets you define proximity using the eps parameter, which indirectly influ‐ ences cluster size. All three methods can be used on large, real-world datasets, are rel‐ atively easy to understand, and allow for clustering into many clusters.

Each of the algorithms has somewhat different strengths. $k$ -means allows for a char‐ acterization of the clusters using the cluster means. It can also be viewed as a decom‐ position method, where each data point is represented by its cluster center. DBSCAN allows for the detection of “noise points” that are not assigned any cluster, and it can help automatically determine the number of clusters. In contrast to the other two methods, it allow for complex cluster shapes, as we saw in the two_moons example. DBSCAN sometimes produces clusters of very differing size, which can be a strength or a weakness. Agglomerative clustering can provide a whole hierarchy of possible partitions of the data, which can be easily inspected via dendrograms.

# Summary and Outlook

This chapter introduced a range of unsupervised learning algorithms that can be applied for exploratory data analysis and preprocessing. Having the right representa‐ tion of the data is often crucial for supervised or unsupervised learning to succeed, and preprocessing and decomposition methods play an important part in data prepa‐ ration.

Decomposition, manifold learning, and clustering are essential tools to further your understanding of your data, and can be the only ways to make sense of your data in the absence of supervision information. Even in a supervised setting, exploratory tools are important for a better understanding of the properties of the data. Often it is hard to quantify the usefulness of an unsupervised algorithm, though this shouldn’t deter you from using them to gather insights from your data. With these methods under your belt, you are now equipped with all the essential learning algorithms that machine learning practitioners use every day.

We encourage you to try clustering and decomposition methods both on twodimensional toy data and on real-world datasets included in scikit-learn, like the digits, iris, and cancer datasets.

# Summary of the Estimator Interface

Let’s briefly review the API that we introduced in Chapters 2 and 3. All algorithms in scikit-learn, whether preprocessing, supervised learning, or unsupervised learning algorithms, are implemented as classes. These classes are called estimators in scikitlearn. To apply an algorithm, you first have to instantiate an object of the particular class:

# In[87]:

```python
from sklearn.linear_model import LogisticRegression logreg = LogisticRegression() 
```

The estimator class contains the algorithm, and also stores the model that is learned from data using the algorithm.

You should set any parameters of the model when constructing the model object. These parameters include regularization, complexity control, number of clusters to find, etc. All estimators have a fit method, which is used to build the model. The fit method always requires as its first argument the data X, represented as a NumPy array or a SciPy sparse matrix, where each row represents a single data point. The data X is always assumed to be a NumPy array or SciPy sparse matrix that has continuous (floating-point) entries. Supervised algorithms also require a y argument, which is a one-dimensional NumPy array containing target values for regression or classifica‐ tion (i.e., the known output labels or responses).

There are two main ways to apply a learned model in scikit-learn. To create a pre‐ diction in the form of a new output like y, you use the predict method. To create a new representation of the input data X, you use the transform method. Table 3-1 summarizes the use cases of the predict and transform methods.

Table 3-1. scikit-learn API summary   

<table><tr><td colspan="2">estimator.fit(x_train, [y_train])</td></tr><tr><td>estimator.predict(X_text)</td><td>estimator.transform(X_test)</td></tr><tr><td>Classification</td><td>Preprocessing</td></tr><tr><td>Regression</td><td>Dimensionality reduction</td></tr><tr><td>Clustering</td><td>Feature extraction</td></tr><tr><td></td><td>Feature selection</td></tr></table>

Additionally, all supervised models have a score(X_test, y_test) method that allows an evaluation of the model. In Table 3-1, X_train and y_train refer to the training data and training labels, while X_test and y_test refer to the test data and test labels (if applicable).