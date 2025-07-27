import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private defaultLang = 'ar';

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
  }

  /**
   * Load a component-specific translation file
   * @param path path to translation JSON (e.g., 'user/en.json')
   */
  async loadComponentTranslations(path: string): Promise<void> {
    const lang = this.translate.currentLang || this.defaultLang;

    const filePath = `/assets/i18n/${path}/${lang}.json`;

    try {
      const translations = await firstValueFrom(this.http.get<any>(filePath));
      this.translate.setTranslation(lang, translations, true); // merge = true
    } catch (err) {
      console.error(`[TranslationService] Failed to load: ${filePath}`, err);
    }
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
