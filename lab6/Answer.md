Name: 魏裕軒
ID: 511558025

### Fuzz Monitor
```
[+] All set and ready to roll!


                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 30 min, 29 sec      │  cycles done : 4      │
│   last new path : 0 days, 0 hrs, 8 min, 52 sec       │  total paths : 21     │
│ last uniq crash : 0 days, 0 hrs, 30 min, 23 sec      │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 30 min, 0 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 5* (23.81%)       │    map density : 0.06% / 0.07%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.77 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : havoc                 │ favored paths : 2 (9.52%)              │
│ stage execs : 19/128 (14.84%)       │  new edges on : 2 (9.52%)              │
│ total execs : 51.0k                 │ total crashes : 1073 (1 unique)        │
│  exec speed : 15.55/sec (zzzz...)   │  total tmouts : 13.2k (6 unique)       │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/2688, 2/2676, 1/2652                │    levels : 4          │
│  byte flips : 0/336, 0/324, 0/300                   │   pending : 9          │
│ arithmetics : 11/18.8k, 0/5345, 0/1632              │  pend fav : 0          │
│  known ints : 1/204, 2/824, 0/1418                  │ own finds : 20         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/2560, 0/752                         │ stability : 100.00%    │
│        trim : 99.97%/103, 0.00%                     ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu000:167%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!

```

### Run Crash Result
```
../src/bmpcomp ./out/crashes/id:000000,sig:06,src:000000,op:flip1,pos:20
size of Herder 54
ASAN:DEADLYSIGNAL
=================================================================
==26947==ERROR: AddressSanitizer: stack-overflow on address 0x7ffec48187a8 (pc 0x563cd7d0b1fb bp 0x7ffec60194e0 sp 0x7ffec48187b0 T0)
    #0 0x563cd7d0b1fa in main /home/user/Desktop/lab6/src/hw0302.c:47
    #1 0x7fd59ba4fc86 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x21c86)
    #2 0x563cd7d0bc79 in _start (/home/user/Desktop/lab6/src/bmpcomp+0x2c79)

SUMMARY: AddressSanitizer: stack-overflow /home/user/Desktop/lab6/src/hw0302.c:47 in main
==26947==ABORTING

```

