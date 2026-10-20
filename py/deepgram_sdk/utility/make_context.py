# Deepgram SDK utility: make_context

from deepgram_sdk.core.context import DeepgramContext


def make_context_util(ctxmap, basectx):
    return DeepgramContext(ctxmap, basectx)
