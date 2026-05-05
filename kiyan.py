#Question 4
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
    print(f"{magician.title()}, that was a great trick!")

#question 2
for number in range(1, 6):
    print(number)

#question 3
for number in range(1, 11):
    print(number, number ** 2)
      
#question 1
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
    print(magician)

#question5
for i in range(1,5):
    print(i)


#question6
for i in range(1,6):
    print(i)


#question7
for i in range(2, 11, 2):
    print(i)

squares = [number ** 2 for number in range(1, 11)]
print(squares)

#question8
num = float(input("Enter a number: "))
for i in range(1, 101):
    if i ** 0.5 <= num:  # check i against the user's input
        print(i)




#question9
numbers = [5, 6, 32, 21, 9]
total = 0

for num in numbers:
    total += num

print(f"Sum of all numbers: {total}")




#question10
number =float(input("Enter a number: "))
count = 0

while number > 0:
    number = number // 10
    count += 1

print("Number of digits:", count)



#question11
for num in numbers:
    if num % 2 != 0:
        print(f"First odd number found: {num}")
        break



#question12
numbers = [12, 16, 17, 24, 29, 30]
for num in numbers:
    if num%2==0:
        print(num)
        continue