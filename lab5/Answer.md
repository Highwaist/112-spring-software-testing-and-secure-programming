# Answer

Name: 魏裕軒
ID: 511558025

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     能   |   能 |
| Stack out-of-bounds  |     能   |   能 |
| Global out-of-bounds |     能   |   能 |
| Use-after-free       |     能   |   能 |
| Use-after-return     |     能   |   能 |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int) * 3);
    ptr[3] = 5;
    int value = ptr[4];
    free(ptr);
    return 0;
}
// GCC 9.3.0
```
#### Valgrind Report
```
==1==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000effc at pc 0x0000004005fa bp 0x7ffdd348d5d0 sp 0x7ffdd348d5c8
WRITE of size 4 at 0x60200000effc thread T0
    #0 0x4005f9 in main /path/to/your/file.c:5
    #1 0x7f7c2a6280b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)

==1==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000effc at pc 0x0000004005fa bp 0x7ffdd348d5d0 sp 0x7ffdd348d5c8
READ of size 4 at 0x60200000effc thread T0
    #0 0x400609 in main /path/to/your/file.c:6
    #1 0x7f7c2a6280b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```
### ASan Report
```
==1==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000effc at pc 0x0000004005fa bp 0x7ffdd348d5d0 sp 0x7ffdd348d5c8
WRITE of size 4 at 0x60200000effc thread T0
    #0 0x4005f9 in main /path/to/your/file.c:5
    #1 0x7f7c2a6280b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)

==1==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000effc at pc 0x0000004005fa bp 0x7ffdd348d5d0 sp 0x7ffdd348d5c8
READ of size 4 at 0x60200000effc thread T0
    #0 0x400609 in main /path/to/your/file.c:6
    #1 0x7f7c2a6280b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int array[5];
    array[5] = 10; 
    int value = array[6]; 
    printf("%d\n", value);
    return 0;
}
// GCC 9.3.0
```
#### Valgrind Report
```
==1==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffca52b8014 at pc 0x0000004005f8 bp 0x7ffca52b7fd0 sp 0x7ffca52b7fc8
WRITE of size 4 at 0x7ffca52b8014 thread T0
    #0 0x4005f7 in main /path/to/your/file.c:5
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)

==1==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffca52b8010 at pc 0x000000400605 bp 0x7ffca52b7fc0 sp 0x7ffca52b7fb8
READ of size 4 at 0x7ffca52b8010 thread T0
    #0 0x400604 in main /path/to/your/file.c:6
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```
### ASan Report
```
==1==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffca52b8014 at pc 0x0000004005f8 bp 0x7ffca52b7fd0 sp 0x7ffca52b7fc8
WRITE of size 4 at 0x7ffca52b8014 thread T0
    #0 0x4005f7 in main /path/to/your/file.c:5
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)

==1==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffca52b8010 at pc 0x000000400605 bp 0x7ffca52b7fc0 sp 0x7ffca52b7fb8
READ of size 4 at 0x7ffca52b8010 thread T0
    #0 0x400604 in main /path/to/your/file.c:6
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int array[5];

int main() {
    array[5] = 10;
    int value = array[6];
    printf("%d\n", value);
    return 0;
}
// GCC 9.3.0
```
#### Valgrind Report
```
==1==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5646d37b8014 at pc 0x5646d37b4000 bp 0x7fff5ccf8f00 sp 0x7fff5ccf8ef8
WRITE of size 4 at 0x5646d37b8014 thread T0
    #0 0x5646d37b3fff in main /path/to/your/file.c:6
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x5646d37b3ee9 in _start (/path/to/your/exe+0x3ee9)

==1==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5646d37b8010 at pc 0x5646d37b400e bp 0x7fff5ccf8ef0 sp 0x7fff5ccf8ee8
READ of size 4 at 0x5646d37b8010 thread T0
    #0 0x5646d37b400d in main /path/to/your/file.c:7
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x5646d37b3ee9 in _start (/path/to/your/exe+0x3ee9)
```
### ASan Report
```
==1==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5646d37b8014 at pc 0x5646d37b4000 bp 0x7fff5ccf8f00 sp 0x7fff5ccf8ef8
WRITE of size 4 at 0x5646d37b8014 thread T0
    #0 0x5646d37b3fff in main /path/to/your/file.c:6
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x5646d37b3ee9 in _start (/path/to/your/exe+0x3ee9)

==1==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5646d37b8010 at pc 0x5646d37b400e bp 0x7fff5ccf8ef0 sp 0x7fff5ccf8ee8
READ of size 4 at 0x5646d37b8010 thread T0
    #0 0x5646d37b400d in main /path/to/your/file.c:7
    #1 0x7fb50374e0b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x5646d37b3ee9 in _start (/path/to/your/exe+0x3ee9)
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    *ptr = 5;
    free(ptr);
    int value = *ptr; 
    return 0;
}
// GCC 9.3.0
```
#### Valgrind Report
```
==1==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000008 at pc 0x0000004005fd bp 0x7ffcbdfbb840 sp 0x7ffcbdfbb838
READ of size 4 at 0x602000000008 thread T0
    #0 0x4005fc in main /path/to/your/file.c:7
    #1 0x7f1204e760b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```
### ASan Report
```
==1==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000008 at pc 0x0000004005fd bp 0x7ffcbdfbb840 sp 0x7ffcbdfbb838
READ of size 4 at 0x602000000008 thread T0
    #0 0x4005fc in main /path/to/your/file.c:7
    #1 0x7f1204e760b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)

```

### Use-after-return
#### Source code
```
#include <stdio.h>

int *function() {
    int value = 5;
    return &value;
}

int main() {
    int *ptr = function();
    int value = *ptr; 
    printf("%d\n", value);
    return 0;
}
// GCC 9.3.0
```
#### Valgrind Report
```
==1==ERROR: AddressSanitizer: stack-use-after-return on address 0x7ffcbde04efc at pc 0x00000040063a bp 0x7ffcbde04ee0 sp 0x7ffcbde04ed8
READ of size 4 at 0x7ffcbde04efc thread T0
    #0 0x400639 in main /path/to/your/file.c:10
    #1 0x7fa7c9bd50b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```
### ASan Report
```
==1==ERROR: AddressSanitizer: stack-use-after-return on address 0x7ffcbde04efc at pc 0x00000040063a bp 0x7ffcbde04ee0 sp 0x7ffcbde04ed8
READ of size 4 at 0x7ffcbde04efc thread T0
    #0 0x400639 in main /path/to/your/file.c:10
    #1 0x7fa7c9bd50b2 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x270b2)
    #2 0x4004ed in _start (/path/to/your/exe+0x4004ed)
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[10];
    int *ptr = &a[0];
    ptr += 11; 
    *ptr = 10;
    return 0;
}
```
### Why
陣列a大小為10，當取得第一個element的指標後，為了避開redzone，所以再把指標往後移動11個位置，但是，ASan會在程式執行期間監視記憶體存取，並在檢測到不正確的記憶體存取時引發錯誤。 
