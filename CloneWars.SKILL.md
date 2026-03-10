# Clone Wars

**WORKFLOW SKILL** — Guide users through setting up and executing phone cloning and screen mirroring for forensic purposes, including data duplication and screen capture. Provides disclaimers and requires user confirmation of legal authorization.

USE FOR: Setting up tools for mobile forensics; guiding through legal and ethical phone data extraction; configuring screen mirroring for investigation; providing step-by-step workflows for cloning phone data with specific commands and troubleshooting.

DO NOT USE FOR: Illegal activities; non-forensic phone operations; general mobile development tasks.

INVOKES: run_in_terminal (for installing tools and running commands), fetch_webpage (for tool documentation and updates), vscode_askQuestions (for clarifying legal/ethical requirements and troubleshooting).

FOR SINGLE OPERATIONS: For quick tool installation, use run_in_terminal directly.

## Important Disclaimers

This skill is for educational and authorized forensic purposes only. Users must confirm they have legal authorization to access the device data. The skill includes safety measures like data encryption and secure deletion.

## Workflow Steps

1. **Legal and Ethical Verification**
   - Display disclaimer about legal requirements
   - Ask user to confirm authorization and jurisdiction
   - Document consent if applicable

2. **Prerequisites Check**
   - Verify device type (Android/iOS) and OS version
   - Check host system (Windows/Linux/Mac) and install prerequisites (USB drivers, Java, etc.)
   - Ensure device is unlocked and USB debugging enabled (Android) or trusted (iOS)

3. **Tool Installation**
   - **Android Mirroring:** Install scrcpy (download from GitHub, run installer)
   - **Android Cloning:** Install ADB (Android SDK Platform Tools)
   - **iOS Mirroring:** Limited options; suggest AirPlay or third-party tools if available
   - **iOS Cloning:** Install libimobiledevice (brew install libimobiledevice on Mac, or alternatives)

4. **Setup Configuration**
   - Configure device connections (USB, wireless)
   - Set up encrypted storage for extracted data
   - Enable audit logging for all operations

5. **Execution**
   - **Android Mirroring:** Run `scrcpy` command with options (e.g., `scrcpy --record file.mp4` for recording)
   - **Android Cloning:** Run `adb backup -apk -shared -all -f backup.ab` for full backup
   - **iOS Mirroring:** Use QuickTime or third-party apps
   - **iOS Cloning:** Use `idevicebackup2 backup` for backup (requires trust)
   - Monitor operations and handle errors

6. **Post-Operation**
   - Verify data integrity (checksums)
   - Encrypt and securely store extracted data
   - Perform secure deletion of temporary files
   - Generate audit log

## Troubleshooting

- **ADB not found:** Ensure PATH includes Android SDK tools
- **Device not recognized:** Install OEM USB drivers, enable USB debugging
- **iOS trust issues:** Connect to iTunes first, trust computer
- **Permission denied:** Confirm device is unlocked, app permissions granted

## Quality Criteria

- Legal compliance verified with user confirmation
- Data integrity maintained through checksums
- All data encrypted during transfer and storage
- Complete audit trail of operations
- Secure cleanup after operations

## Decision Points

- Device platform: Android (full support) vs iOS (limited options)
- Authorization level: Confirmed legal access required
- Operation type: Mirroring only vs full data cloning
- Storage method: Encrypted local vs cloud storage
