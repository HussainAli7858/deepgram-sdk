# Deepgram SDK utility: make_context

from projectname_sdk.core.context import DeepgramContext


def make_context_util(ctxmap, basectx):
    return DeepgramContext(ctxmap, basectx)
