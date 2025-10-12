const mongoose = require('mongoose');
const Question = require('../models/Question');
const User = require('../models/User');

const sampleQuestions = [
  {
    title: "Two Sum",
    description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**
Input: nums = [3,3], target = 6
Output: [0,1]

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
    `,
    difficulty: "easy",
    topics: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]",
        isHidden: false
      },
      {
        input: "[3,3]\n6",
        expectedOutput: "[0,1]",
        isHidden: true
      }
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, the thing that is tricky is that we have to return the indices of the two numbers, not the numbers themselves.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    solutions: [
      {
        language: "javascript",
        code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        explanation: "We use a hash map to store the value and its index. For each number, we check if its complement (target - current number) exists in the map. If it does, we return the indices.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ],
    acceptanceRate: 45.2,
    totalSubmissions: 15000,
    correctSubmissions: 6780,
    averageTime: 15
  },
  {
    title: "Add Two Numbers",
    description: `
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

**Example 2:**
Input: l1 = [0], l2 = [0]
Output: [0]

**Example 3:**
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

**Constraints:**
- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.
    `,
    difficulty: "medium",
    topics: ["Linked List", "Math", "Recursion"],
    companies: ["Microsoft", "Amazon", "Bloomberg", "Adobe"],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros"
    ],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807"
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "0 + 0 = 0"
      }
    ],
    testCases: [
      {
        input: "[2,4,3]\n[5,6,4]",
        expectedOutput: "[7,0,8]",
        isHidden: false
      },
      {
        input: "[0]\n[0]",
        expectedOutput: "[0]",
        isHidden: false
      },
      {
        input: "[9,9,9,9,9,9,9]\n[9,9,9,9]",
        expectedOutput: "[8,9,9,9,0,0,0,1]",
        isHidden: true
      }
    ],
    hints: [
      "Keep track of the carry using a variable and simulate digits-by-digits sum starting from the head of list, which contains the least-significant digit.",
      "Just like how you would sum two numbers on a piece of paper, we begin by summing the least-significant digits, which is the head of l1 and l2.",
      "Since each digit is in the range 0...9, summing two digits may 'overflow'. For example 5 + 7 = 12. In this case, we set the current digit to 2 and bring over the carry=1 to the next iteration."
    ],
    solutions: [
      {
        language: "javascript",
        code: `function addTwoNumbers(l1, l2) {
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;
    
    while (l1 !== null || l2 !== null) {
        let x = l1 ? l1.val : 0;
        let y = l2 ? l2.val : 0;
        let sum = carry + x + y;
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    if (carry > 0) {
        current.next = new ListNode(carry);
    }
    
    return dummyHead.next;
}`,
        explanation: "We iterate through both linked lists, adding corresponding digits and keeping track of the carry. We create a new linked list to store the result.",
        timeComplexity: "O(max(m,n))",
        spaceComplexity: "O(max(m,n))"
      }
    ],
    acceptanceRate: 34.5,
    totalSubmissions: 12000,
    correctSubmissions: 4140,
    averageTime: 25
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `
Given a string s, find the length of the longest substring without repeating characters.

**Example 1:**
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

**Example 2:**
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

**Example 3:**
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

**Constraints:**
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces.
    `,
    difficulty: "medium",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft"],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces"
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    testCases: [
      {
        input: '"abcabcbb"',
        expectedOutput: "3",
        isHidden: false
      },
      {
        input: '"bbbbb"',
        expectedOutput: "1",
        isHidden: false
      },
      {
        input: '"pwwkew"',
        expectedOutput: "3",
        isHidden: true
      }
    ],
    hints: [
      "Use a sliding window approach with two pointers.",
      "Keep track of characters in the current window using a hash set.",
      "When you encounter a duplicate character, move the left pointer until the duplicate is removed."
    ],
    solutions: [
      {
        language: "javascript",
        code: `function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let left = 0;
    let charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        explanation: "We use a sliding window with two pointers. We keep track of characters in the current window using a Set. When we encounter a duplicate, we move the left pointer until the duplicate is removed.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m,n))"
      }
    ],
    acceptanceRate: 31.2,
    totalSubmissions: 18000,
    correctSubmissions: 5616,
    averageTime: 20
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-coding-platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log('Inserted sample questions');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
if (require.main === module) {
  require('dotenv').config();
  seedDatabase();
}

module.exports = { seedDatabase, sampleQuestions };
