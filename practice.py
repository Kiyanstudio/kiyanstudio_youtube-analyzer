fruits = ["apple", "banana", "cherry", "date", "elderberry"]
print(fruits[2])

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
