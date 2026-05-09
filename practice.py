y= float(input("Emter a number: "))
for i in range(1,11):
    print(y*i)

numbers = [0, 1, 2, 3, 4, 5, 6, 7,34, 11, 13, 14]
m= len(numbers) // 2
print(numbers[m-2 :m+2])


fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"]
print(fruits[len(fruits)-3])

numbers = [0, 1, 2, 3, 4, 5, 6, 7,34, 11, 13, 14]
print(numbers[3:7])

data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
print(data[1:10:3])

letters = ["a", "b", "c", "d", "e"]
print(letters[::-1])

squares = []
for i in range(1, 7):
    squares.append(i ** 2)
print(squares)

base = [1, 2, 3]
extra = [4, 5, 6]
print(base + extra)

names = ["Alice", "Charlie", "Diana"]
names.insert(1, "Bob")
print(names)

nums = [1, 2, 3, 2, 4, 2, 5]
print(nums[0:7:2])

tasks = ["plan", "design", "build", "test", "deploy"]
k= tasks.pop(2)
print(k)
print(tasks)

letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
for i in range(1, 8, 2):
    print(letters[i])

nums = [1, 2, 3, 4, 5]
nums[2:3]= [30, 40 , 50]
print(nums)

a = [1, 2, 3, 4, 5]
b = a
a.clear()
print(a)
print(b)

scores = [85, 92, 78, 96, 88, 73, 91]
scores.sort(reverse=True)
print(scores)

original = [3, 1, 4, 1, 5, 9, 2, 6]
ascending =sorted(original)
print(ascending)
print(original)

words = ["banana", "fig", "elderberry", "date", "kiwi"]
words.sort(key=len)
print(words)