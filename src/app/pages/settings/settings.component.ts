import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SettingsFormComponent, UserSettings } from '../../components/general/settings-form/settings-form.component';

/**
 * Componente PADRE: settings
 * 
 * Su responsabilidad es:
 *  1. Proveer los datos iniciales al hijo via @Input
 *  2. Reaccionar a los eventos que emite el hijo via @Output
 *  3. Mostrar notificaciones al usuario con MatSnackBar
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    SettingsFormComponent, // Importamos el componente hijo para poder usarlo en el template
    MatSnackBarModule,     // Módulo para mostrar notificaciones tipo "toast" en la pantalla
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

  /*
    Estado actual de la configuración del usuario.
    Este objeto se pasa al hijo como @Input.
    Cuando el hijo guarda cambios, este objeto se actualiza.
   */
  currentSettings: UserSettings = {
    username: 'Josue',
    email: 'josue@library.com',
    language: 'en',
    notifications: true,
    darkMode: false,
  };

  /**
   * Inyectamos MatSnackBar en el constructor.
   * La inyección de dependencias de Angular nos da una instancia
   * lista para usar sin necesidad de crearla con "new".
   */
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Maneja el @Output "settingsSaved" del componente hijo.
   
   * $event contiene el objeto UserSettings que emitió el hijo.
   * Actualizamos currentSettings con los nuevos datos y mostramos
   * una notificación de éxito en la pantalla.
   
   * @param settings - Datos del formulario emitidos por el hijo
   */
  onSettingsSaved(settings: UserSettings) {
    this.currentSettings = settings; // Actualizamos el estado del padre
    this.snackBar.open('Settings saved successfully ', 'Close', {
      duration: 3000, // La notificación desaparece después de 3 segundos
    });
  }

  /**
   * Maneja el @Output "settingsCancelled" del componente hijo.
   * Solo muestra una notificación informando que se descartaron los cambios.
   */
  onSettingsCancelled() {
    this.snackBar.open('Changes discarded', 'Close', { duration: 2000 });
  }
}