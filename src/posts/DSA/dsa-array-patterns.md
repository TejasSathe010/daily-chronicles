---

title: "Mastering DSA Patterns in Arrays"
date: "2025-10-06"
summary: "A complete deep-dive into the core problem-solving patterns for array-based questions in Data Structures & Algorithms."
---------------------------------------------------------------------------------------------------------------------------------

# 🧠 Mastering DSA Patterns in Arrays

> 💡 **Insight:** Arrays form the foundation of most coding interviews. Recognizing recurring problem-solving patterns will help you solve 80% of problems elegantly instead of memorizing hundreds.

When it comes to cracking technical interviews, **array-based problems** are everywhere — from FAANG rounds to ICPC challenges. Mastering **10–12 logical structures** unlocks your true problem-solving superpower.

---

## 🚀 1. Sliding Window Pattern

> ⚡️ **Use When:** You need to calculate something over a **contiguous subarray** (sum, max, average).

### 💬 Examples

* a. Maximum Sum Subarray of Size `k`
* b. Longest Substring Without Repeating Characters
* c. Minimum Window Substring

> 🧠 **Intuition:** Maintain a moving window that expands and contracts dynamically, reducing `O(N²)` brute force to `O(N)` efficiency.

```cpp
int maxSumSubarray(vector<int>& nums, int k) {
    int windowSum = 0, maxSum = 0;
    int start = 0;

    for (int end = 0; end < nums.size(); end++) {
        windowSum += nums[end]; // expand window

        if (end >= k - 1) {
            maxSum = max(maxSum, windowSum);
            windowSum -= nums[start++]; // shrink window
        }
    }
    return maxSum;
}
```

---

## ⚖️ 2. Two Pointer Pattern

> 💡 **Use When:** Working with **sorted arrays** or searching for **pairs/triplets** meeting a condition.

### 💬 Examples

* Two Sum II (Sorted Input)
* 3Sum Problem
* Move Zeroes / Dutch National Flag

> 🧠 **Intuition:** Move two pointers (`left`, `right`) toward each other based on comparisons.

```cpp
vector<int> twoSumSorted(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}
```

---

## 🔄 3. Fast & Slow Pointers (Cycle Detection)

> 💡 **Use When:** Detecting **cyclic behavior** in linked lists or circular arrays.

### 💬 Examples

* Detect Cycle in Linked List
* Happy Number
* Circular Array Loop

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

---

## 📊 4. Prefix Sum / Cumulative Sum

> 💡 **Use When:** Performing **range-based computations** or frequent subarray sum queries.

### 💬 Examples

* Subarray Sum Equals K
* Range Sum Query
* Maximum Average Subarray

```cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefix;
    prefix[0] = 1;
    int sum = 0, count = 0;

    for (int n : nums) {
        sum += n;
        if (prefix.count(sum - k)) count += prefix[sum - k];
        prefix[sum]++;
    }
    return count;
}
```

---

## ⚙️ 5. Kadane’s Algorithm

> 💡 **Use When:** Finding the **maximum sum contiguous subarray**.

### 💬 Example

* Maximum Subarray (Leetcode 53)

```cpp
int maxSubArray(vector<int>& nums) {
    int currentSum = nums[0];
    int maxSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}
```

---

## 🧊 6. Sorting + Two Pointer Hybrid

> 💡 **Use When:** Finding combinations or subsets satisfying numeric constraints after sorting.

### 💬 Examples

* 3Sum Closest
* Container With Most Water

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1, maxArea = 0;
    while (left < right) {
        int area = min(height[left], height[right]) * (right - left);
        maxArea = max(maxArea, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxArea;
}
```

---

## 🧠 7. Hashing + Frequency Map

> 💡 **Use When:** Counting occurrences or tracking frequency efficiently.

### 💬 Examples

* Longest Consecutive Sequence
* Subarray Sum Equals K
* Top K Frequent Elements

```cpp
int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int longest = 0;
    for (int n : s) {
        if (!s.count(n - 1)) {
            int length = 1;
            while (s.count(n + length)) length++;
            longest = max(longest, length);
        }
    }
    return longest;
}
```

---

## 🔢 8. Monotonic Stack

> 💡 **Use When:** Finding **next greater/smaller elements** or solving **span problems**.

### 💬 Examples

* Next Greater Element
* Daily Temperatures
* Largest Rectangle in Histogram

```cpp
vector<int> nextGreaterElements(vector<int>& nums) {
    vector<int> res(nums.size(), -1);
    stack<int> st;
    for (int i = 0; i < nums.size(); i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            res[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}
```

---

## 🧮 9. Binary Search in Arrays

> 💡 **Use When:** Searching in **sorted arrays** or numerical search spaces.

### 💬 Examples

* Search in Rotated Sorted Array
* Find Peak Element
* Minimum in Rotated Array

```cpp
int binarySearch(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}
```

---

## 🧩 10. In-place Rearrangement

> 💡 **Use When:** Rearranging elements **without extra space** (e.g., cyclic sort or missing numbers).

### 💬 Examples

* Find All Missing Numbers
* Cyclic Sort
* First Missing Positive

```cpp
void cyclicSort(vector<int>& nums) {
    int i = 0;
    while (i < nums.size()) {
        int correct = nums[i] - 1;
        if (nums[i] != nums[correct]) swap(nums[i], nums[correct]);
        else i++;
    }
}
```

---

## 🧭 Key Takeaways

> ✅ Learn **patterns**, not problems.
> ✅ Identify the **shape** of each problem — contiguous, pair-based, cyclic, etc.
> ✅ Combine strategies: *Sorting + Two Pointers*, *Hashing + Prefix Sum*.
> ✅ Dry-run edge cases and visualize the pattern.

---

## 📚 Further Reading

* [Leetcode Pattern Study Guide — Sean Prashad](https://seanprashad.com/leetcode-patterns/)
* [Sliding Window Techniques — GeeksforGeeks](https://www.geeksforgeeks.org/window-sliding-technique/)
* [NeetCode Patterns Playlist — YouTube](https://www.youtube.com/@NeetCode)

---

> 🏁 *Mastering patterns makes you 10× faster in DSA interviews — focus on intuition, not memorization.*

