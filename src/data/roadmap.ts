import { Roadmap } from '../types';

export const roadmapData: Roadmap = {
  modules: [
    {
      id: 'm0',
      week: 'Start',
      titleEn: 'Career Guide & ROI Roadmap',
      titleAm: 'የስራ መመሪያ እና የጥናት ፍሬ',
      descriptionEn: 'How to monetize your new skills in Ethiopia and Africa.',
      descriptionAm: 'አዲሱን እውቀትዎን በኢትዮጵያ እና በአፍሪካ ውስጥ እንዴት ወደ ገቢ እንደሚቀይሩት።',
      lessons: [
        {
          id: 'l0',
          titleEn: 'The Automation Market in Ethiopia',
          titleAm: 'በኢትዮጵያ ውስጥ ያለው የአውቶሜሽን ገበያ',
          contentEn: `
### Industry 4.0 in Africa
As an experienced electrician, you are already ahead. Factories in Dukem, Hawassa, and Bole Lemi are upgrading from manual switches to PLC systems.

**Key Opportunities:**
1. **Maintenance Contracts:** Many factories lack in-house PLC experts. You can offer monthly "Health Checks" for their S7-1200/1500 systems.
2. **System Migration:** Older machines use S7-200 or S7-300. You can help them migrate to the modern S7-1200 and TIA Portal.
3. **Food & Beverage:** This sector uses automation for everything from bottle filling to packaging.

### Job Value Tip:
A technician who only does wiring earns a standard wage. A technician who can **Program a PLC, Design an HMI, and Log Data with Python** is indispensable and can charge high rates for projects.

**ROI Checklist (12-Week Roadmap):**
- **Phase 1 (Hardware):** Fix wiring faults.
- **Phase 2 (Logic):** Write machine sequences.
- **Phase 3 (Integration):** Connect VFDs, HMIs, and Databases.
          `,
          contentAm: `
### ኢንዱስትሪ 4.0 በአፍሪካ
እንደ ልምድ ያለው ኤሌክትሪሻን፣ ቀድሞውኑ ስኬታማ ለመሆን ዝግጁ ነዎት። በዱከም፣ በሀዋሳ እና በቦሌ ለሚ የሚገኙ ፋብሪካዎች ከባህላዊ ስዊች ወደ PLC ሲስተሞች እየተሸጋገሩ ነው።

**ዋና ዋና እድሎች፡**
1. **የጥገና ኮንትራቶች፡** ብዙ ፋብሪካዎች የPLC ባለሙያ የላቸውም። ለS7-1200/1500 ሲስተሞቻቸው ወርሃዊ "የጤና ምርመራ" አገልግሎት መስጠት ይችላሉ።
2. **ሲስተም ሽግግር (Migration)፡** አሮጌ ማሽኖች S7-200 ወይም S7-300 ይጠቀማሉ። እነዚህን ወደ ዘመናዊው S7-1200 እና TIA Portal እንዲቀይሩ መርዳት ከፍተኛ ገቢ ያስገኛል።
3. **ምግብ እና መጠጥ፡** ይህ ዘርፍ ከመጠጥ መሙላት እስከ ማሸግ ድረስ ሁሉንም ስራ አውቶሜት ያደርጋል።

### የስራ ዋጋ ምክር፡
ሽቦ ዝርጋታ ብቻ የሚችል ባለሙያ መደበኛ ደመወዝ ያገኛል። ነገር ግን **PLC ፕሮግራም ማድረግ፣ HMI መንደፍ እና በPython መረጃዎችን ማቀናጀት** የሚችል ባለሙያ በማንኛውም ፋብሪካ ተፈላጊ ነው፤ ለፕሮጀክቶችም ከፍተኛ ክፍያ ይጠይቃል።

**የጥናት እቅድ (ROI Checklist)፡**
- **ደረጃ 1 (Hardware)፡** የሽቦ ዝርጋታ ብልሽቶችን መጠገን።
- **ደረጃ 2 (Logic)፡** የማሽኖችን ቅደም ተከተል መጻፍ።
- **ደረጃ 3 (Integration)፡** VFD፣ HMI እና ዳታቤዝ ማገናኘት።
          `
        }
      ]
    },
    {
      id: 'm1',
      week: '1-2',
      titleEn: 'PLC Hardware & Electrical Wiring',
      titleAm: 'የPLC ሀርድዌር እና የኤሌክትሪክ ሽቦ ዝርጋታ',
      descriptionEn: 'Deep dive into S7-1200 hardware, Sink/Source concepts, and safety wiring.',
      descriptionAm: 'ስለ S7-1200 ሀርድዌር፣ ሲንክ/ሶርስ ጽንሰ-ሀሳብ እና የደህንነት ሽቦ ዝርጋታ ጥልቅ ትምህርት።',
      lessons: [
        {
          id: 'l1.1',
          titleEn: 'CPU Selection and Internal Organization',
          titleAm: 'የCPU ምርጫ እና የውስጥ አደረጃጀት',
          contentEn: `
### Siemens S7-1200 Model Comparison
Selecting the right CPU is your first engineering task.
- **CPU 1211C:** Compact, 6 Digital Inputs (DI), 4 Digital Outputs (DQ). No expansion modules.
- **CPU 1214C:** Most Popular. 14 DI, 10 DQ, 2 Analog Inputs (AI). Supports up to 8 Signal Modules.
- **CPU 1215C:** Dual Ethernet ports, 14 DI, 10 DQ, 2 AI, 2 AO (Analog Outputs).

**Internal Organization (Bilingual Summary):**
1. **Arithmetic Logic Unit (ALU):** Solves math equations. / ሂሳባዊ ስሌቶችን የሚሰራው ክፍል።
2. **Accumulators:** Temporary storage during calculations. / በስሌት ጊዜ መረጃን ለጊዜው የሚይዙ።
3. **Image Process Partition:** A buffer area that copies input states before solving logic. This ensures "Determinism" (stable scan).

### ASCII Hardware Layout:
\`\`\`text
   _____________________________________
  | [PROFINET] [L+] [M] [PE] [INPUTS]    |
  |  LEDs: [RUN] [ERR] [MAINT]           |
  |                                      |
  |         SIEMENS SIMATIC S7-1200       |
  |                                      |
  | [COMM MODULES] [CPU UNIT] [SIGNAL MOD]|
  |______________________________________|
  | [ANALOG] [DC OUTPUTS / RELAYS]       |
  |______________________________________|
\`\`\`
          `,
          contentAm: `
### የSiemens S7-1200 ሞዴሎች ንጽጽር
ትክክለኛውን CPU መምረጥ የመጀመሪያው የኢንጅነሪንግ ስራዎ ነው።
- **CPU 1211C:** ትንሽ፣ 6 ግብዓቶች እና 4 ውጤቶች። ተጨማሪ ክፍሎችን አይቀበልም።
- **CPU 1214C:** በጣም ተፈላጊ። 14 ግብዓቶች፣ 10 ውጤቶች እና 2 አናሎግ ግብዓቶች። እስከ 8 ተጨማሪ ክፍሎችን መቀበል ይችላል።
- **CPU 1215C:** ሁለት የኢንተርኔት ወደቦች፣ 14 ግብዓቶች፣ 10 ውጤቶች፣ 2 አናሎግ ግብዓቶች እና 2 አናሎግ ውጤቶች።

**የውስጥ አደረጃጀት፡**
1. **ALU:** ሂሳባዊ ስሌቶችን የሚሰራ።
2. **Accumulators:** ለጊዜው መረጃን የሚይዙ።
3. **Process Image:** ሎጂኩ ከመሰራቱ በፊት የግብዓቶችን ሁኔታ የሚይዝ ክፍል (ይህ ስራው በተረጋጋ ሁኔታ እንዲከናወን ይረዳል)።
          `
        },
        {
          id: 'l1.2',
          titleEn: 'Digital Input Wiring: Sinking vs Sourcing',
          titleAm: 'የዲጂታል ግብዓት ሽቦ ዝርጋታ፡ ሲንኪንግ እና ሶርሲንግ',
          contentEn: `
As a professional electrician, you must know the path of the current (Conventional Current vs Electron Flow).

### 1. Sourcing Input (PNP Sensors)
The sensor acts like a "Switch" connected to the +24V line.
- **Sensor:** Sends +24V to the PLC Input.
- **PLC Common (M):** Connected to GND.
- **Industry Standard:** This is the most common setup in Siemens factories.

### 2. Sinking Input (NPN Sensors)
The sensor acts like a "Switch" connected to the GND line.
- **Sensor:** Sends Ground (0V) to the PLC Input.
- **PLC Common:** Connected to +24V.

### Wiring Safety Diagram:
\`\`\`text
  (24V DC +) ────────────┬─────────────┐
                         │             │
                    [SENSOR PNP]    [SWITCH]
                         │             │
  PLC INPUT Terminal ───[I0.0]        [I0.1]
                         
  PLC COMMON Terminal ──[ M ]──────────┴───── (24V DC -)
\`\`\`
*Pro Tip: Always use a fuse (e.g. 2A) on the 24V DC line to protect the PLC.*
          `,
          contentAm: `
እንደ ፕሮፌሽናል ኤሌክትሪሻን፣ የኤሌክትሪክ ዥረት የሚሄድበትን መስመር ማወቅ አለብዎት።

### 1. ሶርሲንግ ግብዓት (Sourcing - PNP Sensors)
ሴንሰሩ ከ+24V መስመር ጋር እንደተገናኘ "ስዊች" ይሰራል።
- **ሴንሰር:** +24V ወደ PLC ግብዓት ይልካል።
- **PLC Common (M):** ከመሬት (GND) ጋር ይገናኛል።
- **የኢንዱስትሪ ደረጃ:** በSiemens ፋብሪካዎች ውስጥ በጣም የተለመደው አሰራር ይህ ነው።

### 2. ሲንኪንግ ግብዓት (Sinking - NPN Sensors)
ሴንሰሩ ከመሬት (GND) መስመር ጋር እንደተገናኘ "ስዊች" ይሰራል።
- **ሴንሰር:** መሬት (0V) ወደ PLC ግብዓት ይልካል።
- **PLC Common:** ከ+24V ጋር ይገናኛል።

### የደህንነት ሽቦ ዝርጋታ፡
- ሁልጊዜ የPLCን CPU ለመጠበቅ በ24V DC መስመር ላይ ፊውዝ (ለምሳሌ 2A) ይጠቀሙ።
          `
        }
      ]
    },
    {
      id: 'm2',
      week: '3-4',
      titleEn: 'TIA Portal Software & Sequential Logic',
      titleAm: 'TIA Portal ሶፍትዌር እና ተከታታይ አመክንዮ',
      descriptionEn: 'Mastering the engineering environment and writing clean, structured code.',
      descriptionAm: 'የኢንጅነሪንግ አካባቢውን ማወቅ እና ንጹህ፣ ስልታዊ ኮድ መጻፍ።',
      lessons: [
        {
          id: 'l2.1',
          titleEn: 'Data Types and Binary Logic',
          titleAm: 'የመረጃ አይነቶች እና ባለሁለት አማራጭ አመክንዮ',
          contentEn: `
### Data Types (The Foundation of PLC Coding)
In Python and PHP, types are flexible. In PLC, they are rigid.

1. **BOOL:** 1 Bit (True/False). / 1 ቢት (እውነት ወይም ሀሰት)።
2. **BYTE:** 8 Bits.
3. **WORD:** 16 Bits / 2 Bytes. Used for Analog values (0-27648).
4. **DWORD:** 32 Bits / 4 Bytes.
5. **INT / DINT:** Integers (Numbers). / ሙሉ ቁጥሮች።
6. **REAL:** Floating point numbers (e.g., 24.5°C). / ነጥብ ያላቸው ቁጥሮች።

### Logical Operations:
- **AND Logic:** Inputs in series. All must be ON for output to turn ON.
- **OR Logic:** Inputs in parallel. Either one ON turns output ON.
- **XOR Logic:** ON if ONLY ONE input is ON (Used for parity and special toggles).
          `,
          contentAm: `
### የመረጃ አይነቶች (የPLC ኮዲንግ መሰረት)
በPython እና PHP ውስጥ የመረጃ አይነቶች ተለዋዋጭ ናቸው። በPLC ውስጥ ግን ጥብቅ ናቸው።

1. **BOOL:** 1 ቢት (እውነት ወይም ሀሰት)።
2. **WORD:** 16 ቢት። ለአናሎግ ዋጋዎች (0-27648) ያገለግላል።
3. **REAL:** ነጥብ ያላቸው ቁጥሮች (ለምሳሌ 24.5°C)።

### አመክንዮአዊ ተግባራት (Logical Operations)፡
- **AND Logic:** ግብዓቶች በቅደም ተከተል (series)። ሁሉም "ON" ሲሆኑ ውጤቱ "ON" ይሆናል።
- **OR Logic:** ግብዓቶች በትይዩ (parallel)። አንዳቸው "ON" ሲሆኑ ውጤቱ "ON" ይሆናል።
          `
        },
        {
          id: 'l2.2',
          titleEn: 'Memory Addressing & Symbolic Programming',
          titleAm: 'የማስታወሻ አድራሻ እና የስያሜ ፕሮግራሚንግ',
          contentEn: `
In TIA Portal, we use **Symbolic Names** (Tags) instead of just addresses.
- **Physical Input:** \`%I0.0\` -> Symbolic Name: \`Start_PB\`
- **Physical Output:** \`%Q0.0\` -> Symbolic Name: \`Motor_Contactor\`
- **Internal Bit:** \`%M10.0\` -> Symbolic Name: \`System_Running\`

### The Scan Cycle Paradox:
If you turn an output ON and then OFF in the same scan, the physical output will **never** move. The PLC only updates physical wires at the end of the scan.

**Exercise: Latching Circuit with Set/Reset**
Instead of holding a bit with physical feed-back, use:
- **S (Set):** Latches the output ON.
- **R (Reset):** Latches the output OFF.
- *Priority:** In Siemens, the last command in the network wins unless using special SR/RS blocks.
          `,
          contentAm: `
በTIA Portal ውስጥ ከአድራሻዎች ይልቅ **ተምሳሌታዊ ስሞችን** (Tags) እንጠቀማለን።
- **Physical Input:** \`%I0.0\` -> ስሙ፡ \`የመጀመሪያ ቁልፍ (Start_PB)\`
- **Internal Bit:** \`%M10.0\` -> ስሙ፡ \`ሲስተሙ እየሰራ ነው (System_Running)\`

### የፍተሻ ዑደት (Scan Cycle) ምስጢር፡
በአንድ ዑደት ውስጥ ውጤቱን "ON" ካደረጉ በኋላ መልሰው "OFF" ካደረጉት፣ አካላዊ ውጤቱ በፍጹም አይቀየርም። PLC አካላዊ ሽቦዎችን የሚያዘምነው በዑደቱ መጨረሻ ላይ ብቻ ነው።
          `
        }
      ]
    },
    {
      id: 'm3',
      week: '5-6',
      titleEn: 'HMI Visualization & WinCC Basic',
      titleAm: 'የHMI ምስላዊ መግለጫ እና WinCC መሰረታዊ',
      descriptionEn: 'Designing a professional graphical interface for operators.',
      descriptionAm: 'ለኦፕሬተሮች የሚሆን ፕሮፌሽናል የምስል መገበያያ (Interface) መንደፍ።',
      lessons: [
        {
          id: 'l3.1',
          titleEn: 'Screen Hierarchy and Navigation',
          titleAm: 'የስክሪን አወቃቀር እና አሰሳ',
          contentEn: `
A professional HMI is not just one screen. It is a system.

### Suggested Hierarchy:
1. **Overview Screen:** Overall status of the factory line.
2. **Control Screen:** Buttons to start/stop specific motors.
3. **Parameter Screen:** Input fields to set timer values or speeds.
4. **Alarm Screen:** To see what went wrong.

### Object Properties:
- **Animations:** Change color of a circle (Gray to Green) based on a PLC tag.
- **Events:** Execute a function (e.g. "ChangeScreen") when a button is pressed.
- **Visibility:** Show or Hide objects based on user access levels.
          `,
          contentAm: `
ፕሮፌሽናል HMI ማለት አንድ ስክሪን ብቻ አይደለም። እሱ ስልታዊ አደረጃጀት ነው።

### የሚመከር የስክሪን አደረጃጀት፡
1. **Overview Screen:** የፋብሪካውን አጠቃላይ ሁኔታ የሚያሳይ።
2. **Control Screen:** የተወሰኑ ሞተሮችን ለማስነሳት/ለማቆም የሚያገለግል።
3. **Parameter Screen:** የሰዓት ወይም የፍጥነት ዋጋዎችን ለማስገባት።
4. **Alarm Screen:** ስህተቶችን ለማወቅ።

### የክፍሎች ጠባይ (Properties)፡
- **Animations:** በአንድ ታግ መሰረት የክብ ቀለምን መቀየር (ለምሳሌ ከግራጫ ወደ አረንጓዴ)።
- **Visibility:** በተጠቃሚው ደረጃ (Access Level) መሰረት የተወሰኑ ነገሮችን ማሳየት ወይም መደበቅ።
          `
        }
      ]
    },
    {
      id: 'm4',
      week: '7-8',
      titleEn: 'VFD Principles & PID Control',
      titleAm: 'የVFD መርሆዎች እና የPID ቁጥጥር',
      descriptionEn: 'Controlling motors with precision using frequency and feedback.',
      descriptionAm: 'ሞተሮችን በፍሪኩዌንሲ እና በግብረ-መልስ (Feedback) በጥንቃቄ መቆጣጠር።',
      lessons: [
        {
          id: 'l4.1',
          titleEn: 'Parameterization and Ramp Times',
          titleAm: 'ፓራሜትሮችን ማስተካከል እና የፍጥነት መጨመሪያ ጊዜ',
          contentEn: `
### Top VFD Parameters:
- **P1080 (Min Frequency):** Usually 0Hz.
- **P1082 (Max Frequency):** Usually 50Hz or 60Hz.
- **P1120 (Ramp-up Time):** Time to reach max speed (e.g., 5 seconds). Prevents mechanical shock.
- **P1121 (Ramp-down Time):** Time to reach zero from max speed.

### PID Control (Bilingual Intro):
**Proportional-Integral-Derivative** control is used for constant pressure or temperature.
- **SetPoint (SP):** The target value (e.g. 5 Bar pressure). / ኢላማ የተደረገ ዋጋ።
- **Process Value (PV):** Current value from sensor. / ከሴንሰሩ የሚመጣው አሁናዊ ዋጋ።
- **Output:** Frequency sent to the motor to minimize the "Error" (SP - PV).
          `,
          contentAm: `
### ዋና ዋና የVFD ፓራሜትሮች፡
- **P1082 (Max Frequency):** ከፍተኛው ፍሪኩዌንሲ (አብዛኛውን ጊዜ 50Hz)።
- **P1120 (Ramp-up Time):** ጥንካሬን (shock) ለመከላከል ሞተሩ ከፍተኛ ፍጥነት ላይ ለመድረስ የሚወስድበት ጊዜ።

### የPID ቁጥጥር (PID Control)፡
ይህ ለቋሚ ጫና (pressure) ወይም ሙቀት ቁጥጥር ያገለግላል።
- **SetPoint (SP):** ኢላማ የተደረገው ዋጋ (ለምሳሌ 5 ባር)።
- **Process Value (PV):** ከሴንሰሩ የሚመጣው አሁናዊ ዋጋ።
- **Output:** በሁለቱ መካከል ያለውን ልዩነት አጥብቦ ግቡ ላይ ለመድረስ ወደ ሞተሩ የሚላክ ፍሪኩዌንሲ።
          `
        }
      ]
    },
    {
      id: 'm5',
      week: '9-10',
      titleEn: 'Industrial Networking & Profinet',
      titleAm: 'የኢንዱስትሪ መረብ ግንኙነት እና ፕሮፊኔት',
      descriptionEn: 'Connecting PLC to HMI, VFDs, and Remote IOs.',
      descriptionAm: 'PLCን ከHMI፣ VFD እና ከሌሎች መሳሪያዎች ጋር ማገናኘት።',
      lessons: [
        {
          id: 'l5.1',
          titleEn: 'Network Topologies and IP Management',
          titleAm: 'የኔትወርክ አወቃቀር እና የአይፒ አስተዳደር',
          contentEn: `
### High-Performance Networking
1. **Star Topology:** All devices connected to one Switch. Best for reliability.
2. **Ring Topology:** Devices connected in a loop. If one cable breaks, the system still runs (MRP Protocol).

### PROFINET Device Roles:
- **IO Controller:** Usually the PLC. It manages the whole network.
- **IO Device:** HMIs, VFDs, or Remote IO stations.

**Bilingual Fact:**
In Siemens, the **Device Name** is more important than the IP Address. TIA Portal uses the name to find the device even if the IP changes! / በSiemens ውስጥ ከመሳሪያው አይፒ (IP) ይልቅ **ስሟ (Device Name)** አስፈላጊ ነው።
          `,
          contentAm: `
### ከፍተኛ ጥራት ያለው የኔትወርክ ግንኙነት
1. **Star Topology:** ሁሉም መሳሪያዎች ወደ አንድ ስዊች (Switch) ይገናኛሉ። በጣም አስተማማኝ ነው።
2. **Ring Topology:** መሳሪያዎች በክብ ቅርጽ ይገናኛሉ። አንዱ ገመድ ቢቆረጥም ሲስተሙ መስራቱን ይቀጥላል።

### የPROFINET ሚናዎች፡
- **IO Controller:** አብዛኛውን ጊዜ PLC ነው። መላውን ኔትወርክ ያስተዳድራል።
- **IO Device:** HMI፣ VFD ወይም ሌሎች የመረጃ መሰብሰቢያ ክፍሎች።
          `
        }
      ]
    },
    {
      id: 'm6',
      week: '11-12',
      titleEn: 'Python & Data Analytics for Industry',
      titleAm: 'Python እና የኢንዱስትሪ መረጃ ትንተና',
      descriptionEn: 'The Electrician as a Programmer: Building dashboards and error loggers.',
      descriptionAm: 'ኤሌክትሪሻን እንደ ፕሮግራም አድራጊ፡ የመረጃ ማሳያዎችን እና ስህተት መመዝገቢያዎችን መፍጠር።',
      lessons: [
        {
          id: 'l6.1',
          titleEn: 'Snap7 Advanced & SQL Integration',
          titleAm: 'Snap7 እና የ SQL ውህደት',
          contentEn: `
### Automation + Data
Now you use your Python skills. 
- Read PLC memory (e.g. Total Bottles Produced).
- Save it into a **MySQL or PostgreSQL** database.
- Use **Grafana or Streamlit** to show a dashboard on a phone.

### Why Python is better than HMI for reports?
- **Cost:** HMIs have limited memory. Python can store years of data.
- **Customization:** You can create complex PDF reports automatically.

**Pro Python Practice:**
Always use \`try...except\` blocks when connecting to a PLC. If the Ethernet cable is unplugged, your Python script should not crash!
          `,
          contentAm: `
### አውቶሜሽን + መረጃ (Data)
አሁን የእርስዎን የPython እውቀት ይጠቀማሉ።
- ከPLC መረጃን ማንበብ (ለምሳሌ የተመረቱ ምርቶች ብዛት)።
- መረጃውን በ **MySQL ወይም PostgreSQL** ዳታቤዝ ውስጥ ማስቀመጥ።
- **Grafana ወይም Streamlit** በመጠቀም በስልክዎ ላይ ዳሽቦርድ ማየት።

### ሪፖርት ለማውጣት Python ከHMI ለምን ይሻላል?
- **ዋጋ:** HMIዎች ዝቅተኛ ማህደረ-ትውስታ (memory) አላቸው። Python የዓመታት መረጃን መያዝ ይችላል።
- **ምቾት:** ውስብስብ የሆኑ የPDF ሪፖርቶችን በራሱ እንዲያወጣ ማድረግ ይችላሉ።
          `
        }
      ]
    }
  ]
};

