import type { AppList, CalendarEvent, Task } from '@src/shared/utils/types';

const DRIVE_FILES_URL = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files';
const DATA_FILENAME = 'jarvis_data.json';

export type JarvisData = {
  lists: AppList[];
  tasks: Task[];
  events: CalendarEvent[];
};

const EMPTY_DATA: JarvisData = { lists: [], tasks: [], events: [] };

/**
 * Find the jarvis_data.json file in the app's hidden Google Drive folder.
 * Returns the file ID or null if not found.
 */
async function findDataFile(token: string): Promise<string | null> {
  const query = `name='${DATA_FILENAME}' and 'appDataFolder' in parents and trashed=false`;
  const url = `${DRIVE_FILES_URL}?spaces=appDataFolder&q=${encodeURIComponent(query)}&fields=files(id)`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.files?.[0]?.id ?? null;
}

/**
 * Read the JSON data from Google Drive.
 */
export async function loadFromDrive(token: string): Promise<JarvisData> {
  const fileId = await findDataFile(token);
  if (!fileId) return EMPTY_DATA;

  const res = await fetch(`${DRIVE_FILES_URL}/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return EMPTY_DATA;

  try {
    return (await res.json()) as JarvisData;
  } catch {
    return EMPTY_DATA;
  }
}

/**
 * Save JSON data to Google Drive (create or update).
 */
export async function saveToDrive(token: string, data: JarvisData): Promise<void> {
  const fileId = await findDataFile(token);

  if (fileId) {
    await fetch(`${DRIVE_UPLOAD_URL}/${fileId}?uploadType=media`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } else {
    const metadata = {
      name: DATA_FILENAME,
      parents: ['appDataFolder'],
    };

    const boundary = '-------jarvis_boundary';
    const body =
      `--${boundary}\r\n` +
      `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
      `${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\n` +
      `Content-Type: application/json\r\n\r\n` +
      `${JSON.stringify(data)}\r\n` +
      `--${boundary}--`;

    await fetch(`${DRIVE_UPLOAD_URL}?uploadType=multipart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    });
  }
}
