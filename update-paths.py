# -*- coding: utf-8 -*-
import os
import re

# --- Script para atualizar os caminhos (href, src, url) dentro dos arquivos ---

# Esta função de padronização DEVE ser idêntica à do script de renomear
def standardize_path(path):
    """Aplica as regras de padronização a uma string de caminho."""
    # Ignora URLs absolutas, links de âncora, etc.
    if path.startswith(('http:', 'https:', '//', '#', 'data:')) or not path:
        return path

    # Converte para minúsculas
    new_path = path.lower()
    # Substitui espaços e underscores por hífens
    new_path = re.sub(r'[_ ]', '-', new_path)
    # Remove caracteres especiais, mantendo letras, números, e os caracteres / . -
    # A barra (/) é mantida pois faz parte dos caminhos
    new_path = re.sub(r'[^a-z0-9\/\.\-]', '', new_path)
    return new_path

# Expressão regular para encontrar caminhos em atributos comuns
# Procura por: href="...", src="..." e url(...)
path_regex = re.compile(
    r"""
    (?P<attribute>href|src)\s*=\s*["'](?P<path_attr>[^"']+)["'] # Captura href/src
    |                                                            # OU
    url\(\s*["']?(?P<path_url>[^"')]+)["']?\s*\)               # Captura url()
    """,
    re.VERBOSE | re.IGNORECASE
)

# Os tipos de arquivo que vamos processar
TARGET_EXTENSIONS = ('.html', '.css', '.js')

def update_file_content(file_path):
    """Lê um arquivo, atualiza os caminhos e salva de volta se houver mudanças."""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except IOError as e:
        print(f"  -> Erro ao ler o arquivo: {file_path} ({e})")
        return

    changes_made = set()

    def path_replacer(match):
        """Função chamada para cada caminho encontrado pela regex."""
        # Determina qual grupo da regex capturou o caminho
        old_path = match.group('path_attr') or match.group('path_url')
        
        new_path = standardize_path(old_path)

        if old_path != new_path:
            changes_made.add((old_path, new_path))
            # Substitui apenas a parte do caminho dentro da correspondência completa
            return match.group(0).replace(old_path, new_path)
        
        return match.group(0) # Retorna o trecho original se não houver mudança

    # Aplica a substituição em todo o conteúdo do arquivo
    new_content = path_regex.sub(path_replacer, content)

    # Se algo mudou, salva o arquivo
    if changes_made:
        print(f"Atualizando caminhos em: {file_path}")
        for old, new in sorted(list(changes_made)):
            print(f"  -> Alterado: '{old}'\n             -> para: '{new}'")
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
        except IOError as e:
            print(f"  -> ERRO AO SALVAR: {file_path} ({e})")

# --- Início da Execução ---
print("Iniciando a atualização de caminhos nos arquivos do projeto...")

# Percorre todos os arquivos e pastas a partir do diretório atual
for root, dirs, files in os.walk('.'):
    # Ignora a pasta .git para segurança
    if '.git' in dirs:
        dirs.remove('.git')

    for filename in files:
        if filename.endswith(TARGET_EXTENSIONS):
            update_file_content(os.path.join(root, filename))

print("\nProcesso de atualização concluído.")

