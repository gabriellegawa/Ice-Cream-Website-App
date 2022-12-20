@REM call RunFrontEndApplication.bat
@REM call RunBackEndApplication.bat

@REM start cmd /c "RunFrontEndApplication.bat"
@REM start cmd /c "RunBackEndApplication.bat"

start "runFrontEnd" RunFrontEndApplication.bat
start "runBackEnd" RunBackEndApplication.bat

pause

taskkill /FI "WindowTitle eq ng serve*" /T /F

@REM TODO:Need to fix this as this will close all cmd title starting C:\WINDOWS
taskkill /FI "WindowTitle eq C:\WINDOWS*" /T /F
